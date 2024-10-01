import React from 'react'
import Categorie from '../components/categorie'
import Boutique from '../components/Boutique'
import Pub from '../components/Pub'
import ProduitsAccueil from '../components/ProduitsAccueil';

const Accueil = ({ categories, produits, boutiques }) => {




    return (
        <>
            <div className='container mt-3 d-flex justify-content-around'>
                {categories.map((categorie) => (
                    <Categorie key={categorie.id} categorie={categorie} />
                ))}
            </div>
            <div className='container mt-3' style={{ height: '300px' }}>

                <Pub />
            </div>
            <div className="container-fluid mt-3 p-3 bg-white">
                <ProduitsAccueil categories={categories} produits={produits} />
            </div>
            <div className="container-fluid  d-flex justify-content-center align-items-center mt-3 p-3 h-75" style={{ overflow: 'hidden' }} >
                <div className="col-12 d-flex justify-content-center align-items-center h-full w-full  container p-0" style={{ height: '300px' }}>
                    <div className="col-6 d-flex h-full" >
                        <Pub />
                    </div>
                    <div className="col-6 d-flex flex-column  h-100 m-0 p-0" >
                        <div className="col-12 p-0 mb-1 d-flex justify-content-center align-items-center" style={{ height: '148px' }}>
                            <Pub />
                        </div>
                        <div className="col-12 p-0 d-flex justify-content-center align-items-center flex-end" style={{ height: '148px' }}>
                            <Pub />
                        </div>

                    </div>
                </div>
            </div>
            <div className='container mt-3 d-flex justify-content-center'>
                {boutiques.map((boutique, index) => (
                    <Boutique key={index} boutique={boutique} />
                ))}
            </div>

        </>
    )
}

export default Accueil
