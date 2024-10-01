import axios from 'axios';
import * as jwtDecode from 'jwt-decode';


let saveToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

let logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // Vérifie si le token n'est pas expiré
    } catch (error) {
        return false; // Le token n'est pas valide
    }
}

export const accountService = {
    saveToken, logout, isLogged
}
