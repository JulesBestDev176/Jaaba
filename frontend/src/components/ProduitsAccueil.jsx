import React from 'react'
import Produit from './Produit'

const ProduitsAccueil = ({ produits, categories }) => {

    const findProduitByCategorie = (id) => {
        return produits.filter(produit => produit.categorie_id === parseInt(id))
    }
    return (
        <div className='container p-3'>
            {categories
                .map((categorie) => {
                    const produits = findProduitByCategorie(categorie.id);
                    return (
                        <div key={categorie.id}>
                            <div className="row p-2">
                                <div className="col-3">
                                    <div className=' title fs-2'>{categorie.nom}</div>
                                </div>
                            </div>
                            <div className="row mt-3 p-2 d-flex justify-content-start ">
                                {
                                    produits.map((produit) => (
                                        <Produit key={produit.id} produit={produit} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default ProduitsAccueil
