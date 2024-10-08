import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import ProduitPanier from './ProduitPanier';
import { useUser } from '../services/UserContext';
import axios from 'axios'
import { accountService } from '../services/account.services';

const Header = ({ categories, roles, produits, panier }) => {


    const { user, setUser } = useUser();
    const [total, setTotal] = useState(0);

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [tel, setTel] = useState('');
    const [adresse, setAdresse] = useState('');
    const [quantite, setQuantite] = useState('');


    const navigate = useNavigate();

    const handleInscription = async (e) => {
        e.preventDefault();

        const utilisateur = {
            prenom,
            nom,
            role,
            email,
            password,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, utilisateur);
            setMessage(response.data.message); // Message de succès ou d'erreur
            // Réinitialiser le formulaire
            setPrenom('');
            setNom('');
            setRole('');
            setEmail('');
            setPassword('');

        } catch (error) {
            setMessage('Une erreur est survenue lors de l\'inscription.');
        }
    };

    const handleCommande = async (e) => {
        e.preventDefault()
        const produits = []
        panier.forEach((pa) => {
            let produit = {
                "id": pa.id,
                "quantiteProduit": 1,
                "prixProduit": pa.prix,
            }
            produits.push(produit)
        })
        const commande = {
            "nom": nom,
            "prenom": prenom,
            "email": email,
            "telephone": tel,
            "adresse": adresse,
            "password": password,
            "produits": produits
        }
        localStorage.removeItem('panier')
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/store`, commande)
            setMessage(response.data.message)
            setNom('')
            setPrenom('')
            setAdresse('')
            setTel('')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.error("Erreur lors de la commande:", error);
            setMessage('Une erreur est survenue lors de la commande.');
        }
        window.location.reload();

    }


    const handleConnexion = async (e) => {
        e.preventDefault();
        const utilisateur = {
            email,
            password,
        };

        try {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, utilisateur);
            const { token, user } = response.data;

            setUser(null);



            if (token) {
                accountService.saveToken(token);
                localStorage.setItem('userId', user.id);
                setUser(user);



                if (user.role === "client") {
                    navigate(`/compte/profile`);
                    // Actualiser la page
                    window.location.reload();
                } else if (user.role === "vendeur") {
                    navigate(`/userDashboard/profile`);
                    // createBoutique(token)
                    // Actualiser la page
                    window.location.reload();
                } else {
                    alert(`Rôle inconnu: ${user.role}`);
                    // Actualiser la page
                    window.location.reload();
                }

                const modal = document.getElementById('connexion');
                const bootstrapModal = window.bootstrap.Modal.getInstance(modal); // Récupérer l'instance Bootstrap du modal
                bootstrapModal.hide();
            } else {
                const msg = 'Email ou mot de passe incorrect';
                alert(msg);
                const modalTrigger = document.getElementById('connexionTrigger');
                modalTrigger.click();
            }



        } catch (error) {
            setMessage('Une erreur est survenue lors de la connexion.');
        }



    };

    const handleDeconnexion = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire

        const token = localStorage.getItem('token'); // Récupérer le token

        try {
            // Faire un appel API pour déconnecter l'utilisateur
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                },
            });

            // Supprimer le token et l'ID de l'utilisateur du localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            // Mettre à jour l'état de l'utilisateur
            setUser(null);

            // Rediriger l'utilisateur vers la page de connexion
            navigate('/'); // Remplacez '/login' par la route appropriée
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
        }
    }






    const calculerTotal = () => {
        let total = 0;
        if (panier) {
            panier.forEach(pa => {
                if (pa) {
                    total += pa.prix * 1;
                } else {
                    total = 0
                }
            });
        }
        setTotal(total);
    };



    useEffect(() => {
        calculerTotal();
        const token = localStorage.getItem('token'); // Récupérer le token
        const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur

        if (token && userId) {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data.results); // Récupérer l'utilisateur du backend
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
                    setUser(null); // Si une erreur se produit, définir l'utilisateur sur null
                });
        } else {
            setUser(null); // Si pas de token ou d'ID, définir l'utilisateur sur null
        }
    }, [produits, roles]);



    const updateProduitQuantite = (produitId, nouvelleQuantite) => {
        // setPanier((prevProduits) =>
        //     prevProduits.map((prod) =>
        //         prod.id === produitId ? { ...prod, quantite: nouvelleQuantite } : prod
        //     )
        // );
    };



    return (
        <>
            <div className='fixed-top' >
                <header className='header-top py-2'>
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-9">
                                <p className='m-0 fs-6'>Livraison partout à Dakar.</p>
                            </div>
                            <div className="col-3 text-end d-flex justify-content-around">
                                {
                                    user ?
                                        (user.role === "client" ?
                                            <Link to="/compte/profile" className='txt-jaune fs-6 m-0'>
                                                <IoIosFlash /> {user.prenom} {user.nom}
                                            </Link> :
                                            user.role === "vendeur" ?
                                                <Link to="/userDashboard/profile" className='txt-jaune fs-6 m-0'>
                                                    <IoIosFlash /> {user.prenom} {user.nom}
                                                </Link> :
                                                user.role === "livreur" ?
                                                    <Link to="/userDashboard/profile" className='txt-jaune fs-6 m-0'>
                                                        <IoIosFlash /> {user.prenom} {user.nom}
                                                    </Link> :
                                                    null
                                        ) :
                                        <Link to="/" className='txt-jaune fs-6 m-0'><IoIosFlash /> Inconnue </Link>
                                }

                                <Link to="/contact" className='fs-6 m-0 text-white'>Contact</Link>
                            </div>
                        </div>
                    </div>
                </header>
                <header className="header-main py-4">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-2 d-flex align-items-center justify-content-center">
                                <h2>
                                    <Link to="/" className='txt-blue'>Jaaba</Link>
                                </h2>
                            </div>
                            <div className="col-5 d-flex align-items-center">
                                <form className="input-group ">
                                    <input type="text" className="form-control" placeholder="Chercher un produit" aria-label="Chercher un produit" aria-describedby="basic-addon2" />
                                    <span className="input-group-text color-blue text-white border-0 txt-gray" id="basic-addon2"><FaSearch /></span>
                                </form>
                            </div>
                            <div className="col-5 d-flex justify-content-center">

                                <div className="col-6 d-flex justify-content-between">
                                    <div className="col-2 d-flex align-items-center">
                                        <CiUser className='fs-2 txt-gray' />
                                    </div>
                                    <div className="col-10 text-start ps-2">
                                        <div className="col txt-gray">
                                            <Link to={user ? "compte/profile" : "/"}>Mon Compte</Link>
                                        </div>
                                        <div className="col">
                                            {user ?
                                                <button type="button" className='txt-noire no-button' onClick={handleDeconnexion}>Déconnexion</button>
                                                :
                                                <button type="button" data-bs-toggle="modal" data-bs-target="#connexion" className='txt-noire no-button'>Connexion</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-between">
                                    <div className="col-2 d-flex align-items-center">
                                        <AiOutlineShoppingCart className='fs-2 txt-gray' />
                                    </div>
                                    <div className="col-10 text-start ps-2">
                                        <div className="col txt-gray">
                                            Mon Panier
                                        </div>
                                        <div className="col">
                                            <button type="button" data-bs-toggle="offcanvas" data-bs-target="#panier" className='txt-noire no-button'>
                                                {total.toLocaleString()} CFA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </header>
                <header className="header-bottom py-2">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="dropdown col-2 d-flex justify-content-start border-end align-items-center">
                                <div className="dropdown-toggle row d-flex justify-content-center align-items-center" data-bs-toggle="dropdown" aria-expanded="false" >
                                    <RiMenu2Fill className='col-3 fs-3' />
                                    <div className='col-6 fs-5'>Categories</div>
                                    <MdOutlineKeyboardArrowDown className='col-3 fs-3' />
                                </div>
                                <ul className="dropdown-menu dropdown-menu-start mt-2 p-0">

                                    <li className='border-top'><Link to='/produits' className="dropdown-item">Tous</Link></li>
                                    {categories.map((categorie) => {

                                        return (
                                            <li className='border-top' key={categorie.id}>
                                                <Link to={"/produits/" + `${categorie.id}`} className="dropdown-item">
                                                    {categorie.nomCategorie}
                                                </Link>
                                            </li>
                                        )

                                    })}
                                </ul>
                            </div>
                            <div className="col-8 d-flex justify-content-around align-items-center border-end">
                                <Link to='/' className='txt-noire'>Accueil</Link>
                                <Link to='/produits' className='txt-noire'>Produits</Link>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <CiHeart className='fs-2 txt-gray' />
                            </div>
                        </div>
                    </div>
                </header>
            </div>


            {/* modal connexion */}
            <div className="modal fade" id="connexion" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Connexion</h1>
                            <button id="connexionTrigger" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 d-flex ">
                                    <div className="col-8">
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleConnexion}
                                        >
                                            Se connecter
                                        </button>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <button type="button" className="btn btn-link link-underline link-underline-opacity-0" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#inscription">S'inscrire</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal inscription */}
            <div className="modal fade" id="inscription" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Inscription</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleInscription}>
                                <div className="row mb-3">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Prénom"
                                            aria-label="Prenom"
                                            value={prenom}
                                            onChange={(e) => setPrenom(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom"
                                            aria-label="Nom"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        aria-label="Type de compte"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Type de compte</option>
                                        {roles.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        aria-label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Mot de passe"
                                        aria-label="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {message && <p className="text-danger">{message}</p>} {/* Affichage du message d'erreur ou de succès */}
                                <div className="col-12 d-flex">
                                    <div className="col-8">
                                        <button type="submit" className="btn btn-primary">S'inscrire</button>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-link link-underline link-underline-opacity-0"
                                            data-bs-dismiss="modal"
                                            data-bs-toggle="modal"
                                            data-bs-target="#connexion"
                                        >
                                            Se connecter
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal commande */}
            <div className="modal fade" id="commander" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Connexion</h1>
                            <button id="connexionTrigger" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="prenomCo" className="form-label">Prenom</label>
                                    <input
                                        type="text"
                                        name='prenomCo'
                                        className="form-control"
                                        id="prenomCo"
                                        value={prenom}
                                        onChange={(e) => setPrenom(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nomCo" className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        name='nomCo'
                                        className="form-control"
                                        id="nomCo"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telCo" className="form-label">Telephone</label>
                                    <input
                                        type="text"
                                        name='telCo'
                                        className="form-control"
                                        id="telCo"
                                        value={tel}
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="adresseCo" className="form-label">Adresse</label>
                                    <input
                                        type="text"
                                        name='adresseCo'
                                        className="form-control"
                                        id="adresseCo"
                                        value={adresse}
                                        onChange={(e) => setAdresse(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emailCo" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name='emailCo'
                                        className="form-control"
                                        id="emailCo"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordCo" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name='passwordCo'
                                        className="form-control"
                                        id="passwordCo"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>


                                <div className="col-12 d-flex ">
                                    <div className="col-8">
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleCommande}
                                        >
                                            Commander
                                        </button>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <button type="button" className="btn btn-link link-underline link-underline-opacity-0" data-bs-dismiss="modal" aria-label="Close">Annuler</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Offcanvas Panier */}
            <div className="offcanvas offcanvas-end bg-white" tabIndex="-1" id="panier" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 id="offcanvasRightLabel">Panier  {/*({panier.reduce((total, produit) => total + produit.quantite, 0)}) */}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="row">
                        {panier ? panier.map((produit, index) => {

                            return (
                                <ProduitPanier
                                    updateProduitQuantite={updateProduitQuantite}
                                    key={index}
                                    produit={produit}
                                    quantite={1} // Quantité associée au produit dans le panier
                                />
                            );
                        }) :
                            null
                        }
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <p>Sous-total: </p>
                        </div>
                        <div className="col-6 text-end">
                            <p className='txt-blue'>
                                {total.toLocaleString()} CFA
                            </p>
                        </div>
                    </div>
                    <div className="position-absolute bottom-0 start-0 end-0 p-3">
                        <div className="col-12">
                            <button
                                className='btn btn-primary w-100'
                                data-bs-dismiss="modal"
                                data-bs-toggle="modal"
                                type='button'
                                data-bs-target="#commander"
                            >Commander</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header
