import { useState, useEffect, useRef } from 'react';
import axios from 'axios'


const PageNotification = () => {

    const [commande, setCommande] = useState([])
    const [detailCommande, setDetail] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({ id: null, nom: '', prix: '', description: '' });

    const modalRef = useRef(null);

    const handleOpenModal = (action, produit = { id: null, nom: '', prix: '', description: '' }) => {
        setCurrentAction(action);
        setSelectedProduct(produit);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct({ id: null, nom: '', prix: '', description: '' });
    };

    const getDetailCommande = async (e, id) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        try {
            const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/show/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                },
            });
            setDetail(resp.data)
            console.log(resp.data);
        } catch (error) {

        }
    }
    // Ajout d'un produit
    const handleAddProduct = () => {
        setProduits([
            ...produits,
            {
                id: produits.length + 1,
                nom: selectedProduct.nom,
                prix: parseFloat(selectedProduct.prix),
                description: selectedProduct.description,
            },
        ]);
        handleCloseModal();
    };

    const handleUpdateProduct = () => {
        setProduits(
            produits.map((produit) =>
                produit.id === selectedProduct.id
                    ? { ...produit, nom: selectedProduct.nom, prix: parseFloat(selectedProduct.prix), description: selectedProduct.description }
                    : produit
            )
        );
        handleCloseModal();
    };

    // Suppression d'un produit
    const handleDeleteProduct = () => {
        setProduits(produits.filter((produit) => produit.id !== selectedProduct.id));
        handleCloseModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({ ...selectedProduct, [name]: value });
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    const fetchCommande = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendeur/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                },
            });
            setCommande(res.data.commandes);
            console.log(res.data.commandes)
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes :", error);
        }
    }

    useEffect(() => {
        fetchCommande()
        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Liste des Commandes</h2>

            <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Reference</th>
                        <th scope="col">Statut</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {commande ? commande.map((co) => (
                        <tr key={co.id}>
                            <th scope="row">{co.id}</th>
                            <td>{co.montant} FCFA</td>
                            <td>{co.reference}</td>
                            <td>{co.statut}</td>
                            <td>
                                <div className="col-12 d-flex">
                                    <div className="col-6">
                                        <button className="btn btn-success btn-sm" onClick={() => handleOpenModal('supprimer', produit)}>
                                            Terminer
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#detail" onClick={(e) => getDetailCommande(e, co.id)}>
                                            Voir Commande
                                        </button>
                                    </div>
                                </div>

                            </td>
                        </tr>
                    )) : null}
                </tbody>
            </table>

            <div className="modal fade" id="detail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Details Commande</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Prenom et Nom</th>
                                        <th scope="col">Tel</th>
                                        <th scope="col">Produits</th>
                                        <th scope="col">Prix Unitaire * Quantite</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailCommande && detailCommande.customer ? (
                                        <tr>
                                            <td scope="col"> {detailCommande.customer.prenom} {detailCommande.customer.nom} </td>
                                            <td scope="col">{detailCommande.customer.telephone}</td>
                                            <td scope="col">
                                                <ul>
                                                    {
                                                        // Utilisation d'un Set pour suivre les libellés déjà affichés
                                                        (() => {
                                                            const displayedLibelles = new Set();
                                                            return detailCommande.produits.map((produit, index) => {
                                                                const userId = localStorage.getItem('userId');

                                                                // Afficher uniquement si le libellé n'a pas encore été affiché
                                                                if (produit.user_id == userId && !displayedLibelles.has(produit.libelle)) {
                                                                    displayedLibelles.add(produit.libelle);
                                                                    return (
                                                                        <li key={index}>{produit.libelle}</li>
                                                                    );
                                                                }
                                                                return null; // Ne rien rendre si le libellé a déjà été affiché
                                                            });
                                                        })()
                                                    }
                                                </ul>
                                            </td>
                                            <td scope="col">
                                                <ul>
                                                    {
                                                        // Calcul du prix total pour chaque produit
                                                        (() => {
                                                            const produitCount = {};

                                                            // Calculer le nombre de fois où chaque produit apparaît
                                                            detailCommande.produits.forEach(produit => {
                                                                if (!produitCount[produit.libelle]) {
                                                                    produitCount[produit.libelle] = 0;
                                                                }
                                                                produitCount[produit.libelle] += produit.pivot.quantiteProduit;
                                                            });

                                                            // Afficher le prix total pour chaque produit une seule fois
                                                            return Object.entries(produitCount).map(([libelle, quantite], index) => {
                                                                const produit = detailCommande.produits.find(p => p.libelle === libelle);
                                                                return (
                                                                    <li key={index}>
                                                                        {produit.prix} * {quantite} = {produit.prix * quantite} FCFA
                                                                    </li>
                                                                );
                                                            });
                                                        })()
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    ) : null}

                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default PageNotification
