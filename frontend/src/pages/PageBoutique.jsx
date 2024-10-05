import React, { useState, useEffect } from 'react'
import { CiCamera } from "react-icons/ci";
import axios from 'axios';

const PageBoutique = () => {

    const [boutique, setBoutique] = useState({})
    const [adresse, setAdresse] = useState('')
    const [nomBoutique, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [telephone, setTelephone] = useState('')
    const [message, setMessage] = useState('');
    const defaultImage = new URL("../assets/images/auto.jpg", import.meta.url).href;
    const [photoUrl, setPhotoUrl] = useState(defaultImage)
    const [logo, setLogo] = useState('')


    const fetchBoutique = async () => {
        const token = localStorage.getItem('token');
        try {
            const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/boutique/vendeur`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                    },
                }
            )
            const data = resp.data.boutique;
            setBoutique(data);
            setNom(data.nomBoutique);
            setDescription(data.description);
            setAdresse(data.adresse);
            setTelephone(data.telephone)
            setLogo(data.logo)
            let imageUrl = new URL(`../../../backend/storage/app/public/images/profil/${boutique.photo}`, import.meta.url).href
            setPhotoUrl(imageUrl);
        } catch (error) {
            console.error("Erreur lors de la récupération de la boutique :", error);
        }
    }

    const updateBoutique = async (e) => {
        e.preventDefault()
        const boutiqueUp = {
            nomBoutique,
            description,
            adresse,
            telephone
        }
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId')
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/boutique/${userId}`,
                boutiqueUp,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
                    },
                }
            )
            setMessage(response.data.message);
        } catch (error) {
            console.error("Erreur lors de la modification de la boutique :", error);
            // Optionnel : afficher un message d'erreur
            setMessage("Une erreur est survenue lors de la modification de la boutique.");
        }
    }

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }

    };

    useEffect(() => {
        fetchBoutique();
    }, [])


    return (
        <div>
            <div className="container w-50 card p-3">
                <div className="d-flex justify-content-center">
                    <div className="position-relative">
                        <img
                            src={!logo ? defaultImage : photoUrl}
                            className="rounded-circle border border-success"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            alt="User avatar"
                        />
                        <div className="position-absolute" style={{ bottom: "5px", right: "5px" }}>
                            <input type="file" id="image" className="d-none" name='photo' onChange={handlePhotoChange} />
                            <label htmlFor="image" className="bg-light rounded-circle d-flex justify-content-center align-items-center" style={{ width: "30px", height: "30px", cursor: "pointer" }}>
                                <CiCamera />
                            </label>
                        </div>
                    </div>
                </div>

                <br />
                <br />

                <div className="w-100 px-3">
                    <form>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="nomBoutique" className="form-label">Nom</label>
                            <input
                                type="text"
                                id="nomBoutique"
                                name="nomBoutique"
                                value={nomBoutique}
                                className="form-control"
                                required
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={description}
                                    cols="30" rows="5"
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                >

                                </textarea>

                            </div>
                        </div>


                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="adresse" className="form-label">Adresse</label>
                                <input
                                    type="text"
                                    id="adresse"
                                    className="form-control"
                                    required
                                    value={adresse}
                                    name="adresse"
                                    onChange={(e) => setAdresse(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="telephone" className="form-label">Telephone</label>
                                <input
                                    type="text"
                                    id="telephone"
                                    className="form-control"
                                    required
                                    value={telephone}
                                    name="adresse"
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                            </div>

                        </div>

                        <button type="submit" className="btn btn-outline-primary w-100 mt-4" onClick={updateBoutique}>Modifier</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default PageBoutique
