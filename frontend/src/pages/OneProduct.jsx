import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const OneProduct = ({ produits, categories }) => {

    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const [quantite, setQuantite] = useState(1);
    const [categorie, setCategorie] = useState(null);

    const produitRequest = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/produits/${id}`); // Correction ici
            setProduit(res.data.produit);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    };



    useEffect(() => {
        // Simuler une requête vers un backend pour récupérer le produit
        produitRequest();
    }, [id]); // Dépendance uniquement sur l'id

    useEffect(() => {
        if (produit && categories) {
            const foundCategorie = categories.find(cat => cat.id === produit.categorie_id);
            setCategorie(foundCategorie);
        }
    }, [produit, categories]);




    const handleIncrement = () => {
        if (quantite < produit.quantite) {
            setQuantite(quantite + 1);
        }
    };


    if (!produit) {
        return <p>Chargement...</p>;
    }
    const imageUrl = new URL(`../../../backend/storage/app/public/images/produits/${produit.photo}`, import.meta.url).href;


    const handleDecrement = () => {
        if (quantite > 1) {
            // const nouvelleQuantite = quantite;
            // updateProduitQuantite(produit.id, nouvelleQuantite);
            setQuantite(quantite - 1);

        }
    };


    return (
        <>
            <div className="">
                <p className='txt-gray'>Accueil / Produits / {categorie ? categorie.nomCategorie : "Catégorie inconnue"}  /{produit.libelle} </p>
            </div>
            <div className="bg-white border-bottom p-3">
                <div className="row mb-3">
                    <div className="col-6 border-end d-flex justify-content-center align-items-center">
                        <div className="row d-flex justify-content-center align-items-center">
                            <img src={imageUrl}
                                alt={produit.nom} style={{ width: '300px' }} />
                        </div>
                    </div>
                    <div className="col-6 p-3">
                        <div className="row mb-3">
                            <p className="txt-gray">
                                {/* {categorie.nom} */}
                            </p>
                        </div>
                        <div className="row">
                            <h5>{produit.libelle}</h5>
                        </div>
                        <div className="row mb-3">
                            <div className="col"></div>
                            <div className="col-4 d-flex flex-end">
                                <button className='btn btn-outline-success'>{produit.quantite} en stock</button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <h3 className='txt-red'>{produit.prix} CFA</h3>
                        </div>
                        <div className="row mb-3 p-3">
                            <div className="card bg-info p-3 d-flex justify-content-center border-0" style={{ maxWidth: '18rem' }}>
                                <div>
                                    <p className='text-primary'>{produit.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 d-flex align-items-center">
                                <div className="col-4 d-flex align-items-center">
                                    <button className="btn border-end-0  rounded-end-0 bg-secondary text-white border-black" onClick={handleDecrement}>-</button>
                                    <input
                                        type="number"
                                        className="form-control border-black rounded-top-0 rounded-bottom-0 bg-white"
                                        value={quantite}
                                        readOnly
                                        style={{ width: '60px' }}
                                    />
                                    <button className="btn border-start-0 border-black bg-secondary text-white  rounded-start-0" onClick={handleIncrement}>+</button>
                                </div>
                                <div className="col-8  txt-blue w-full">
                                    <button className='btn btn-primary' style={{ width: '100%' }}>Ajouter au panier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 d-flex align-items-center justify-content-center p-3">
                    <div className="row card container p-3 text-center">
                        <div className="col-12 d-flex align-items-center justify-content-center mb-3">
                            <button className='btn btn-primary'>AVIS</button>
                        </div>
                        <div className="row mb-3">
                            <h3>Soyez le premier à commenter “{produit.description_courte}”</h3>
                        </div>
                        <div className="row mb-3">
                            <p className="txt-gray">Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *</p>
                        </div>
                        <div className="row mb-3 d-flex justify-content-center">
                            <div className="col-4"></div>
                            <div className="col-2">
                                <p className="txt-gray">Votre code <span className='txt-red'>*</span></p>
                            </div>
                            <div className="col-2">

                            </div>
                            <div className="col-4"></div>
                        </div>
                        <div className="row mb-3">
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Votre avis *" id="floatingTextarea" style={{ height: "100px", padding: '5px' }}></textarea>
                            </div>
                            <div className="row g-3 d-flex justify-content-center mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Prenom" aria-label="Prenom" />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Nom" aria-label="Nom" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4 text-start">
                                    <button className='btn btn-dark'>SOUMMETTRE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OneProduct
