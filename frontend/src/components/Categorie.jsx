import React from 'react'
import { Link } from 'react-router-dom'

const Categorie = ({ categorie }) => {
    return (
        <div className='card col-2 p-3'>
            <Link to={"/produits/" + `${categorie.id}`}>
                <div className="row d-flex align-items-center justify-content-between">
                    <div className="col-3">
                        <i className={`${categorie.icone}` + " fs-1"} ></i>
                    </div>
                    <div className="col-9 txt-noire">
                        {categorie.nom}
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default Categorie
