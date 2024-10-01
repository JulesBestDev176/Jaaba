import React from 'react'

const Boutique = ({ boutique }) => {
    const imageUrl = new URL(`../assets/images/profil/${boutique.photo}`, import.meta.url).href;

    return (
        <div className='card col-2 p-3 m-3'>
            <div className="row d-flex align-items-center justify-content-between">
                <div className="col-2 d-flex align-items-center justify-align-content-center">
                    <img
                        style={{ width: '50px', height: '50px' }}
                        className='rounded-circle'
                        src={imageUrl}
                        alt={boutique.nom}
                    />
                </div>
                <div className="col-8 d-flex flex-column align-items-center justify-align-content-center">
                    <div className="col-12">
                        {boutique.nom}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Boutique
