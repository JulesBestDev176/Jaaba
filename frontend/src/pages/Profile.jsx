import React, { useState } from 'react'
import { CiCamera } from "react-icons/ci";

const Profile = ({ utilisateur }) => {



    const [nom, setNom] = useState(utilisateur.nom)
    const [prenom, setPrenom] = useState(utilisateur.prenom)
    const [email, setEmail] = useState(utilisateur.email)
    const [tel, setTel] = useState(utilisateur.tel)
    const [adresse, setAdresse] = useState(utilisateur.adresse)
    const [password, setPassword] = useState(utilisateur.nom)
    const [photo, setPhoto] = useState(utilisateur.photo)
    const imageUrl = new URL(`../assets/images/profil/${utilisateur.photo}`, import.meta.url).href;

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };



    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const updatedUser = {
    //         nom,
    //         prenom,
    //         email,
    //         tel,
    //         pays,
    //         region,
    //         ville,
    //         codePostal,
    //         password,
    //         photo: photo.split('/').pop()
    //     };

    //     const formData = new FormData();
    //     formData.append('photo', photoFile);
    //     formData.append('user', JSON.stringify(updatedUser));

    //     try {
    //         const response = await fetch('/api/updateProfile', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             console.log("Informations mises à jour avec succès");
    //         } else {
    //             console.error("Erreur lors de la mise à jour des informations");
    //         }
    //     } catch (error) {
    //         console.error("Erreur de réseau :", error);
    //     }
    // };


    return (
        <div>
            <div className="container w-50 card p-3">
                <div className="d-flex justify-content-center">
                    <div className="position-relative">
                        <img
                            src={imageUrl}
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
