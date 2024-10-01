import React, { useState } from 'react'

const ProduitPanier = ({ produit, updateProduitQuantite }) => {

    const [quantite, setQuantite] = useState(produit.quantite);

    const handleIncrement = () => {
        // const nouvelleQuantite = quantite;
        // updateProduitQuantite(produit.id, nouvelleQuantite);
        setQuantite(quantite + 1);

    };

    const handleDecrement = () => {
        if (quantite > 1) {
            // const nouvelleQuantite = quantite;
            // updateProduitQuantite(produit.id, nouvelleQuantite);
            setQuantite(quantite - 1);

        }
    };

    const imageUrl = new URL(`../assets/images/produits/${produit.photo}`, import.meta.url).href;



    return (
        <div className='col-12 d-flex mt-3 mb-3 border-bottom'>
            <div className="col-3">
                <img src={imageUrl}
                    alt={produit.nom} style={{ width: '70px', height: '70px' }} />
            </div>
            <div className="col-9">
                <div className="col-12">
                    <p className='txt-gray'>{produit.nom}</p>
                </div>
                <div className="col-12 d-flex">
                    <div className="col-6 d-flex align-items-center">
                        <button className="btn no-button increment" onClick={handleDecrement}>-</button>
                        <input
                            type="number"
                            className="form-control valeur"
                            value={quantite}
                            readOnly
                            style={{ width: '60px' }}
                        />
                        <button className="btn no-button decrement" onClick={handleIncrement}>+</button>
                    </div>
                    <div className="col-6 txt-blue">{produit.prix} CFA</div>
                </div>
            </div>
        </div>
    )
}

export default ProduitPanier
