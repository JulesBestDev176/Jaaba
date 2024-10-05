import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../UserDashboard.css'
import axios from 'axios'
import { accountService } from '../services/account.services';

const MenuDashboard = () => {
    const [isExpanded, setIsExpanded] = useState(true)
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDeconnexion = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire

        const token = localStorage.getItem('token'); // Récupérer le token

        try {
            // Faire un appel API pour déconnecter l'utilisateur
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                },
            });

            // Supprimer le token et l'ID de l'utilisateur du localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');




            // Rediriger l'utilisateur vers la page de connexion
            navigate('/'); // Remplacez '/login' par la route appropriée
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
        }
    }
    return (
        <>
            <aside id="sidebar" className={`${isExpanded ? 'expand' : ''}`}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={handleToggle}>
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <div className="sidebar-logo">
                        <a href="/">Jaaba</a>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/" className="sidebar-link">
                            {/*<i className="lni lni-user"></i>*/}
                            <i className="lni lni-home"></i>
                            <span>Accueil</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/profile" className="sidebar-link">
                            <i className="lni lni-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/boutique" className="sidebar-link">
                            <i className="lni lni-cart-full"></i>
                            <span>Boutiques</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/produits" className="sidebar-link">
                            <i className="lni lni-agenda"></i>
                            <span>Produits</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/notifications" className="sidebar-link">
                            <i className="lni lni-popup"></i>
                            <span>Notification</span>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <button type="button" className="no-button sidebar-link btn text-white" onClick={handleDeconnexion}>
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default MenuDashboard
