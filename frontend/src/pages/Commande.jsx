import React from 'react'

const Commande = ({ commandes, utilisateur }) => {
    const commandesFiltre = commandes.filter(commande => commande.utilisateurId === utilisateur.id)

    const handlePaye = (id) => {

    }

    return (
        <div className='p-3'>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Statut</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        commandes.map((commande) => {
                            return (
                                <tr key={commande.id}>
                                    <th scope="row">{commande.id}</th>
                                    <td>{commande.date}</td>
                                    <td>{commande.statut}</td>
                                    <td>{commande.statut}</td>
                                    <td className='text-center'><button className='btn btn-success' onClick={handlePaye(commande.id)}>Payer</button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Commande
