import React, { useState, useEffect } from 'react'
import { CiCamera } from "react-icons/ci";

const Profile = ({ utilisateur }) => {
    const [userLoaded, setUserLoaded] = useState(false);


    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [adresse, setAdresse] = useState('')
    const [password, setPassword] = useState('')
    const [photo, setPhoto] = useState('')
    const defaultImage = new URL("../assets/images/auto.jpg", import.meta.url).href;
    const [photoUrl, setPhotoUrl] = useState(defaultImage)

    useEffect(() => {
        console.log(defaultImage)
        console.log(photo)
        console.log(photoUrl)

        if (utilisateur) {
            setNom(utilisateur.nom);
            setPrenom(utilisateur.prenom);
            setEmail(utilisateur.email);
            setAdresse(utilisateur.adresse);
            setPhoto(utilisateur.photo);
            setTel(utilisateur.telephone)
            let imageUrl = new URL(`../../../backend/storage/app/public/images/profil/${utilisateur.photo}`, import.meta.url).href
            setPhotoUrl(imageUrl)
            // console.log(utilisateur.photo)
            setUserLoaded(true);// L'utilisateur est chargé

        } else {
            setNom('');
            setPrenom('');
            setEmail('');
            setTel('');
            setAdresse('');
            setPassword('');
            setPhoto(defaultImage);
        }

    }, [utilisateur]);

    if (!userLoaded) {
        return <div>Loading...</div>; // Affiche le chargement tant que les données ne sont pas prêtes
    }

    const imageUrl = new URL(`../../../backend/storage/app/public/images/profil/${utilisateur.photo}`, import.meta.url).href;



    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };





    return (
        <div>
            <div className="container w-50 card p-3">
                <div className="d-flex justify-content-center">
                    <div className="position-relative">
                        <img
                            src={!photo ? defaultImage : photoUrl}
                            alt={utilisateur.nom}
                            className="rounded-circle border border-success"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
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
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="prenom" className="form-label">Prenom</label>
                                <input
                                    type="text"
                                    id="prenom"
                                    className="form-control"
                                    required
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="nom" className="form-label">Nom</label>
                                <input
                                    type="text"
                                    id="nom"
                                    className="form-control"
                                    required
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="tel" className="form-label">Telephone</label>
                                <input
                                    type="tel"
                                    id="tel"
                                    className="form-control"
                                    required
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                />
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
                                    onChange={(e) => setAdresse(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="password" className="form-label">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-outline-primary w-100 mt-4">Modifier</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Profile
