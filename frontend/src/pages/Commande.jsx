import React from 'react'

const Commande = ({ commandes, utilisateur }) => {
    const commandesFiltre = commandes.filter(commande => commande.utilisateurId === utilisateur.id)
    return (
        <div className='p-3'>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        commandes.map((commande) => {
                            return (
                                <tr>
                                    <th scope="row">{commande.id}</th>
                                    <td>{commande.dateCommande}</td>
                                    <td>{commande.statut}</td>
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
