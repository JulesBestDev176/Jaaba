import { useState, useEffect, useRef } from 'react';
const PageProduits = () => {
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
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="nom" className="form-label">
                                                Nom du produit
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nom"
                                                name="nom"
                                                value={selectedProduct.nom}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="prix" className="form-label">
                                                Prix du produit (€)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="prix"
                                                name="prix"
                                                value={selectedProduct.prix}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="prix" className="form-label">
                                                Quantité du produit (€)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="quantite"
                                                name="quantite"
                                                value={selectedProduct.prix}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">
                                                Description du produit
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                name="description"
                                                rows="3"
                                                value={selectedProduct.description}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Annuler
                                </button>
                                {currentAction === 'supprimer' && (
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>
                                        Supprimer
                                    </button>
                                )}
                                {currentAction === 'ajouter' && (
                                    <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
                                        Ajouter
                                    </button>
                                )}
                                {currentAction === 'modifier' && (
                                    <button type="button" className="btn btn-primary" onClick={handleUpdateProduct}>
                                        Enregistrer
                                    </button>
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