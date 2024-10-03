import React from 'react';
import Produit from './Produit';

const ProduitsAccueil = ({ produits, categories }) => {

    const filterProduitsByCategorie = (id) => {
        return produits.filter(produit => produit.categorie_id === parseInt(id));
    }

    return (
        <div className='container p-3'>
            {categories.map((categorie) => {
                const filteredProduits = filterProduitsByCategorie(categorie.id);
                return (
                    <div key={categorie.id}>
                        {filteredProduits.length > 0 ? (
                            <>
                                <div className="row p-2">
                                    <div className="col-3">
                                        <div className='title fs-2'>{categorie.nomCategorie}</div>
                                    </div>
                                </div>
                                <div className="row mt-3 p-2 d-flex justify-content-start">
                                    {filteredProduits.map((produit) => (
                                        <Produit key={produit.id} produit={produit} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            null
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ProduitsAccueil;
