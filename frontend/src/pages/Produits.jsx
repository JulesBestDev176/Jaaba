import React from 'react'
import Produit from '../components/Produit'
import { useParams } from 'react-router-dom'

const Produits = ({ produits, categories }) => {
    const { categorieId } = useParams();
    const categorieIdNumber = parseInt(categorieId);
    let categorie;
    if (categories) {
        categorie = categories.find(cat => cat.id === categorieIdNumber);
    }
    const produitsFiltres = produits.filter(produit => produit.categorie_id === categorieIdNumber);

    return (
        <>
            <div className="row p-3">
                <p className='txt-gray'>Accueil / Produits / {categorie ? `${categorie.nom}` : ''}</p>
            </div>
            <div className="container-fluid bg-white mb-0 border-bottom">
                <div className="row p-3">
                    <h4>{categorie === undefined ? 'Produits' : `${categorie.nom}`}</h4>
                </div>
                <div className="row d-flex">
                    {/* <div className="col-3 mb-3 border-end">
                        <div className="row p-3">
                            <h6>Prix</h6>
                        </div>
                        <div className="row p-3">
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    0 CFA - 5 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    5 000 CFA - 10 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    10 000 CFA - 20 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    20 000 CFA - 30 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    30 000 CFA - 40 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    50 000 CFA - 100 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    100 000 CFA - 150 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    150 000 CFA - 200 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    200 000 CFA - 300 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    300 000 CFA - 400 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    400 000 CFA - 500 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    500 000 CFA - 1000 000 CFA
                                </label>
                            </div>
                            <div class="form-check m-2">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    1000 000 CFA & Plus
                                </label>
                            </div>


                        </div>
                    </div> */}
                    <div className="col-12 d-flex flex-wrap justify-content-around h-75">
                        {
                            !categorie ? (
                                produits.map((produit) => (
                                    <Produit key={produit.id} produit={produit} />
                                ))
                            ) : (
                                produitsFiltres.map((produit) => (
                                    <Produit key={produit.id} produit={produit} />
                                ))
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Produits
