import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'


const Produit = ({ produit }) => {
    const [panier, setPanier] = useState([])
    const [imageUrl, setImageUrl] = useState('')
    const bouton = {
        background: 'white',
        color: '#1B1B1B',
        fontWeight: 'bold',
    }

    const ajouterAuPanier = (produit) => {
        let panier = JSON.parse(localStorage.getItem("panier")) || []; // Récupérer le panier existant ou créer un tableau vide
        panier.push(produit); // Ajouter le nouveau produit au panier
        localStorage.setItem("panier", JSON.stringify(panier)); // Mettre à jour le localStorage
        // Actualiser la page
        window.location.reload();
    };

    // const img = new URL('../../../backend/storage/app/public/images/')


    useEffect(() => {
        if (produit && produit.photo) {
            const url = new URL(`../../../backend/storage/app/public/images/produits/${produit.photo}`, import.meta.url).href;
            setImageUrl(url);
        }
    }, [produit])

    return (
        <div className='card col-3 p-2 ms-3 mb-3'>

            <div className="col">
                <Link to={`/produit/${produit.id}`}>
                    <div className='row'>
                        <img src={imageUrl}
                            alt={produit.libelle}
                            style={{ height: '200px' }}
                        />
                    </div>
                    <div className="row">
                        <p>{produit.libelle}</p>
                    </div>
                    <div className="row text-center">
                        <h6>{produit.description}</h6>
                    </div>
                    <div className="row text-center">
                        <h3 className='txt-red'>{produit.prix}</h3>
                    </div>
                </Link>
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-center ">
                        <button className='btn mb-2 border-primary w-100' style={bouton} onClick={() => ajouterAuPanier(produit)} >AJOUTER AU PANIER  </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Produit
