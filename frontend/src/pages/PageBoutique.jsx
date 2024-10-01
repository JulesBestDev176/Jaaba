import React, { useState } from 'react'
import { CiCamera } from "react-icons/ci";

const PageBoutique = () => {


    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }

    };
    const imageUrl = new URL(`../assets/images/profil/jules.jpg`, import.meta.url).href;

    return (
        <div>
            <div className="container w-50 card p-3">
                <div className="d-flex justify-content-center">
                    <div className="position-relative">
                        <img
                            src={imageUrl}
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
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input
                                type="text"
                                id="nom"
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
                                    cols="30" rows="5"
                                    className='form-control'
                                    onChange={(e) => setEmail(e.target.value)}
                                >

                                </textarea>

                            </div>
                        </div>


                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="pays" className="form-label">Pays</label>
                                <input
                                    type="text"
                                    id="pays"
                                    className="form-control"
                                    required
                                    onChange={(e) => setPays(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="region" className="form-label">Region</label>
                                <input
                                    type="text"
                                    id="region"
                                    className="form-control"
                                    required
                                    onChange={(e) => setRegion(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="ville" className="form-label">Ville</label>
                                <input
                                    type="text"
                                    id="ville"
                                    className="form-control"
                                    required
                                    onChange={(e) => setVille(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="codePostal" className="form-label">Code postal</label>
                                <input
                                    type="number"
                                    id="codePostal"
                                    className="form-control"
                                    required
                                    onChange={(e) => setCodePostal(e.target.value)}
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

export default PageBoutique
