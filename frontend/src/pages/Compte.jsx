import React, { useState } from 'react'
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom'

const Compte = ({ utilisateur }) => {
    const [activeLink, setActiveLink] = useState('profile'); // Défaut sur 'profile'

    const handleLinkClick = (link) => {
        setActiveLink(link); // Met à jour l'état du lien actif
    };

    if (!utilisateur) {
        return <div>Loading...</div>; // Affiche un message de chargement
    }



    return (
        <>
            <div className="row container-fluid p-3">
                <p className='txt-gray'>Accueil / Compte / {utilisateur.prenom} {utilisateur.nom} </p>
            </div>
            <div className="container-fluid bg-white d-flex justify-content-center">
                <div className="col-12 d-flex justify-content-around p-3 mb-3 mt-3 w-full">
                    <div className="col-6 text-center">
                        <h2>
                            <Link
                                to='/compte/profile'
                                className={`text-black ${activeLink === 'profile' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('profile')}
                            >
                                Profile
                            </Link>
                        </h2>
                    </div>
                    <div className="col-6 text-center">
                        <h2>
                            <Link
                                to='/compte/commande'
                                className={`text-black ${activeLink === 'commande' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('commande')}
                            >
                                Commandes
                            </Link>
                        </h2>
                    </div>
                </div>

            </div>
            <div className=" p-3 col-12 mb-3">
                <Outlet />
            </div>
        </>
    )
}

export default Compte
