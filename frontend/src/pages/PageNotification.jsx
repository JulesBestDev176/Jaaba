import { useState, useEffect, useRef } from 'react';


const PageNotification = () => {
    const [produits, setProduits] = useState([
        { id: 1, nom: 'Ordinateur portable', prix: 999.99, description: 'Un ordinateur portable haut de gamme.' },
        { id: 2, nom: 'Smartphone', prix: 699.99, description: 'Un smartphone de dernière génération.' },
        { id: 3, nom: 'Casque audio', prix: 199.99, description: 'Un casque audio avec réduction de bruit.' },
    ]);

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

    useEffect(() => {
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

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prix (€)</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map((produit) => (
                        <tr key={produit.id}>
                            <th scope="row">{produit.id}</th>
                            <td>{produit.nom}</td>
                            <td>{produit.prix}</td>
                            <td>{produit.description}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleOpenModal('modifier', produit)}>
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
        </div>
    )
}

export default PageNotification
