import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Container from './components/Container'
import Accueil from './pages/Accueil'
import About from './pages/About'
import Contact from './pages/Contact'
import Produits from './pages/Produits'
import OneProduct from './pages/OneProduct';
import Compte from './pages/Compte'
import Commande from './pages/Commande'
import Profile from './pages/Profile'
import { useUser } from './services/UserContext';
import UserDashboard from './pages/UserDashboard';
import PageBoutique from './pages/PageBoutique';
import PageProduits from './pages/PageProduits';
import PageNotification from './pages/PageNotification';
import data from './assets/data.json';
import axios from 'axios'
import { accountService } from './services/account.services';

function App() {

  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [roles, setRoles] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [adresses, setAdresses] = useState([]);
  const [paniers, setPaniers] = useState([]);
  const [boutiques, setBoutiques] = useState([]);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const token = localStorage.getItem('token'); // Récupérer le token
    const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur

    produitsRequest();
    fetchCategories();

    if (token && userId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.results); // Récupérer l'utilisateur du backend
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
          setUser(null); // Si une erreur se produit, définir l'utilisateur sur null
        });
      fetchCommande();
    } else {
      setUser(null); // Si pas de token ou d'ID, définir l'utilisateur sur null
    }


  }, []);

  const produitsRequest = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/produits`); // Correction ici
      setProduits(res.data.produits);
    } catch (error) {
      console.error("Erreur lors de la récupération des rôles :", error);
    }
  };


  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`);
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };


  const fetchCommande = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/client/orders`, {
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
        },
      })
      setCommandes(res.data.commandes)
    } catch (error) {

    }
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container categories={categories} utilisateurs={utilisateurs} roles={roles} paniers={paniers} produits={produits} />}>
            <Route index element={<Accueil categories={categories} produits={produits} boutiques={boutiques} />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/produits" element={<Produits produits={produits} />} />
            <Route path="/produits/:categorieId" element={<Produits produits={produits} categories={categories} />} />
            <Route path="/produit/:id" element={<OneProduct produits={produits} categories={categories} />} />
            <Route path='/compte' element={<Compte utilisateur={user} />}>
              <Route path="profile/" element={<Profile utilisateur={user} />} />
              <Route path="commande/" element={<Commande utilisateur={user} commandes={commandes} />} />
            </Route>
          </Route>
          <Route path='/userDashboard' element={<UserDashboard utilisateur={user} adresses={adresses} />}>
            <Route path='profile/' element={<Profile utilisateur={user} adresses={adresses} />} />
            <Route path='boutique/' element={<PageBoutique utilisateur={user} adresses={adresses} />} />
            <Route path='produits/' element={<PageProduits />} />
            <Route path='notifications/' element={<PageNotification />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
