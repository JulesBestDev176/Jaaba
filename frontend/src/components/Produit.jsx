import React from 'react'
import { NavLink, Link } from 'react-router-dom'


const Produit = ({ produit }) => {
    const bouton = {
        background: 'white',
        color: '#1B1B1B',
        fontWeight: 'bold',
    }

    // const img = new URL('../../../backend/storage/app/public/images/')

    const imageUrl = new URL(`../../../backend/storage/app/public/images/produits/${produit.photo}`, import.meta.url).href;



    return (
        <div className='card col-3 p-2 ms-3 mb-3'>
            <Link to={`/produit/${produit.id}`}>
                <div className="col">
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
                    <div className="row">
                        <div className="col d-flex justify-content-center align-items-center ">
                            <button className='btn mb-2 border-primary w-100' style={bouton}>AJOUTER AU PANIER  </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Produit
