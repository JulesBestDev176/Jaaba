import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

const Container = ({ categories, utilisateurs, produits, panier }) => {

    const [roles, setRoles] = useState([])


    const rolesRequest = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/roles`); // Correction ici
            setRoles(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des rôles :", error);
        }
    };


    useEffect(() => {
        rolesRequest();
    }, []);

    return (
        <>
            <Header panier={panier} categories={categories} utilisateurs={utilisateurs} roles={roles} produits={produits} />
            <div style={{ marginTop: '200px' }}> {/* Ajuste la valeur selon la hauteur de ton header */}
                <Outlet />
            </div>
            <Footer />

        </>
    )
}

export default Container
