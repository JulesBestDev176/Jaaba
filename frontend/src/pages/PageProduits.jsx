import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CiCamera } from "react-icons/ci";

const PageProduits = () => {
    const [produits, setProduits] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({ id: null, nom: '', prix: '', description: '', quantite: '' });
    const [photo, setPhoto] = useState(null);
    const modalRef = useRef(null);
    const imageUrl = new URL(`../../../backend/storage/app/public/images/profil/${photo}`, import.meta.url).href;
    const [libelle, setLibelle] = useState('');
    const [message, setMessage] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const [categorie_id, setCategorie] = useState('')
    const defaultImage = new URL("../assets/images/auto.jpg", import.meta.url).href;
    const [photoUrl, setPhotoUrl] = useState(defaultImage)
    const [produit, setProduit] = useState({})
    const [idProduit, setId] = useState(0)

    const categories = [
        {
            "id": 1,
            "nomCategorie": "Electronique"
        },
        {
            "id": 2,
            "nomCategorie": "Mode"
        },
        {
            "id": 3,
            "nomCategorie": "Alimentaire"
        },
        {
            "id": 4,
            "nomCategorie": "Cosmétique"
        },
    ]


    // Requête pour récupérer les produits depuis le backend
    const fetchProduits = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/produits`);
            setProduits(res.data.produits);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    };

    const fetchProductById = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/produits/${id}`);
            const produit = res.data.produit; // Assurez-vous que c'est le bon chemin d'accès
            setProduit(produit); // Vous pouvez conserver cette ligne si besoin
            // Mettez à jour les champs du formulaire
            setLibelle(produit.libelle);
            setPrix(produit.prix);
            setQuantite(produit.quantite);
            setDescription(produit.description);
            setCategorie(produit.categorie_id); // Si vous avez un champ catégorie
            setPhoto(produit.photo); // Mettez à jour l'URL de l'image
            setId(produit.id)
            // console.log(produit.photo)
            let imageUrl = new URL(`../../../backend/storage/app/public/images/produits/${produit.photo}`, import.meta.url).href
            setPhotoUrl(imageUrl);
        } catch (error) {
            console.error("Erreur lors de la récupération du produit :", error);
            return null;
        }
    };

    // Requête pour ajouter un produit
    const ajouterProduitRequest = async () => {

        if (prix <= 0 || quantite <= 0) {
            setMessage("Le prix et la quantité doivent être supérieurs à 0.");
            return;
        }

        const formData = new FormData();
        formData.append('libelle', libelle);  // autres champs que tu veux envoyer
        formData.append('description', description);
        formData.append('prix', Number(prix));
        formData.append('quantite', Number(quantite));
        formData.append('categorie_id', Number(categorie_id));
        formData.append('photo', photo);  // ajout de la photo


        const token = localStorage.getItem('token');
        console.log('photo:', photo);
        console.log(photo.name)
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/produits`,
                formData,  // Passer l'objet produit dans le corps de la requête
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                    },
                }
            );

            fetchProduits();
            setMessage(response.data.message); // Message de succès ou d'erreur
            // Réinitialiser le formulaire (ajusté aux champs du produit)
            setLibelle('');
            setDescription('');
            setPrix('');
            setQuantite('');
            setPhoto('');
            setCategorie();
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
            // Optionnel : afficher un message d'erreur
            setMessage("Une erreur est survenue lors de l'ajout du produit.");
        }
    };

    //Requête pour modifier produit
    const updateProduitRequest = async () => {

        if (prix <= 0 || quantite <= 0) {
            setMessage("Le prix et la quantité doivent être supérieurs à 0.");
            return;
        }

        const formData = new FormData();
        formData.append('libelle', libelle);  // autres champs que tu veux envoyer
        formData.append('description', description);
        formData.append('prix', Number(prix));
        formData.append('quantite', Number(quantite));
        formData.append('categorie_id', Number(categorie_id));
        formData.append('photo', photo);  // ajout de la photo


        const token = localStorage.getItem('token');
        console.log('photo:', photo);
        try {

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/produits/${idProduit}`,
                formData,  // Passer l'objet produit dans le corps de la requête
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                    },
                }
            );

            fetchProduits();
            setMessage(response.data.message); // Message de succès ou d'erreur
            // Réinitialiser le formulaire (ajusté aux champs du produit)
            setLibelle('');
            setDescription('');
            setPrix('');
            setQuantite('');
            setPhoto('');
            setCategorie();
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
            // Optionnel : afficher un message d'erreur
            setMessage("Une erreur est survenue lors de l'ajout du produit.");
        }
    };


    // Ouvrir le modal avec une action (ajouter/modifier/supprimer)
    const handleOpenModal = (action, id) => {
        setCurrentAction(action);
        setShowModal(true);

        if (action === 'modifier' && id) {
            fetchProductById(id); // Récupérer le produit par ID
        } else {
            // Réinitialiser les champs du formulaire si on ouvre le modal pour ajouter un produit
            setLibelle('');
            setPrix('');
            setQuantite('');
            setDescription('');
            setCategorie('');
            setPhoto('');
            setPhotoUrl(defaultImage)
        }
    };

    // Fermer le modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct({ id: null, nom: '', prix: '', description: '', quantite: '' });
    };



    // Mise à jour d'un produit
    const handleUpdateProduct = () => {
        setProduits(
            produits.map((produit) =>
                produit.id === selectedProduct.id
                    ? { ...produit, nom: selectedProduct.nom, prix: parseFloat(selectedProduct.prix), description: selectedProduct.description, quantite: selectedProduct.quantite }
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

    // Gestion des changements dans les inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({ ...selectedProduct, [name]: value });
    };

    // Gestion de la photo
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Vérification du type d'image
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (validImageTypes.includes(file.type)) {
                setPhotoUrl(URL.createObjectURL(file)); // Affiche l'aperçu
                setPhoto(file);  // Stocke l'objet File
            } else {
                setMessage("Le fichier sélectionné n'est pas une image valide.");
            }
        }
    };

    // Gestion du clic à l'extérieur du modal pour le fermer
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        fetchProduits();
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
            <h2 className="mb-4">Liste des Produits</h2>

            <button className="btn btn-primary mb-3" onClick={() => handleOpenModal('ajouter')}>
                Ajouter un produit
            </button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prix (€)</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map((produit) => (
                        <tr key={produit.id}>
                            <th scope="row">{produit.id}</th>
                            <td>{produit.libelle}</td>
                            <td>{produit.prix}</td>
                            <td>{produit.description}</td>
                            <td>{produit.quantite}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleOpenModal('modifier', produit.id)}>
                                    Modifier
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleOpenModal('supprimer', produit)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content" ref={modalRef}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {currentAction === 'ajouter' && 'Ajouter un produit'}
                                    {currentAction === 'modifier' && 'Modifier le produit'}
                                    {currentAction === 'supprimer' && 'Supprimer le produit'}
                                </h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                {currentAction === 'supprimer' && selectedProduct && (
                                    <p>Voulez-vous vraiment supprimer le produit : {selectedProduct.nom} ?</p>
                                )}
                                {(currentAction === 'ajouter' || currentAction === 'modifier') && (
                                    <form >
                                        {/* Gestion de l'image */}
                                        <div className="d-flex justify-content-center">
                                            <div className="position-relative">
                                                <img
                                                    src={!photo ? defaultImage : photoUrl}
                                                    alt="Product"
                                                    className="rounded-circle border border-success"
                                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                                />
                                                <div className="position-absolute" style={{ bottom: "5px", right: "5px" }}>
                                                    <input type="file" id="image" className="d-none" name='photo' onChange={handlePhotoChange} />
                                                    <label htmlFor="image" className="bg-light rounded-circle d-flex justify-content-center align-items-center" style={{ width: "30px", height: "30px", cursor: "pointer" }}>
                                                        <CiCamera />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <br />
                                        <div className="mb-3">
                                            <label htmlFor="libelle" className="form-label">Libelle</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="libelle"
                                                name="libelle"
                                                value={libelle}
                                                onChange={(e) => setLibelle(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="prix" className="form-label">Prix du produit (€)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="prix"
                                                name="prix"
                                                value={prix}
                                                onChange={(e) => setPrix(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="quantite" className="form-label">Quantité du produit</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="quantite"
                                                name="quantite"
                                                value={quantite}
                                                onChange={(e) => setQuantite(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description du produit</label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                name="description"
                                                rows="3"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <select
                                                className="form-select"
                                                aria-label="Categorie"
                                                value={categorie_id}
                                                onChange={(e) => setCategorie(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Type de compte</option>
                                                {categories.map((categorie) => (
                                                    <option key={categorie.id} value={categorie.id}>{categorie.nomCategorie}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Annuler</button>
                                {currentAction === 'supprimer' && (
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>Supprimer</button>
                                )}
                                {currentAction === 'ajouter' && (
                                    <button type="button" className="btn btn-primary" onClick={ajouterProduitRequest}>Ajouter</button>
                                )}
                                {currentAction === 'modifier' && (
                                    <button type="button" className="btn btn-warning" onClick={updateProduitRequest}>Modifier</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageProduits;
