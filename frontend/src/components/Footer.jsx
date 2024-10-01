import React from 'react'
import { FaTruckFast } from "react-icons/fa6";
import { NavLink, Link } from 'react-router-dom'
import { CiDollar } from "react-icons/ci";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { FiFacebook } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { PiTiktokLogo } from "react-icons/pi";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div className="container-fluid  mt-0 p-3 bg-white d-flex justify-content-center flex-column align-items-center ">
                <div className="row container mt-3 mb-3 border-bottom d-flex ">
                    <div className="col-3 d-flex justify-content-between align-items-center">
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <FaTruckFast size={50} className='txt-blue' />
                        </div>
                        <div className="col-9">
                            <div className="col-12">
                                <h6>LIVRAISON</h6>
                            </div>
                            <div className="col-12">
                                <p className='txt-gray'>Livraison partout au Sénégal</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center">
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <CiDollar size={50} className='txt-blue' />
                        </div>
                        <div className="col-9">
                            <div className="col-12">
                                <h6>RETOURS</h6>
                            </div>
                            <div className="col-12">
                                <p className='txt-gray'>Garantie de retour sous 7 jours</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center">
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <MdOutlineHeadsetMic size={50} className='txt-blue' />
                        </div>
                        <div className="col-9">
                            <div className="col-12">
                                <h6>Assistance 24/7</h6>
                            </div>
                            <div className="col-12">
                                <p className='txt-gray'>Assistance en ligne 24 heures sur 24</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center">
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <CiCreditCard1 size={50} className='txt-blue' />
                        </div>
                        <div className="col-9">
                            <div className="col-12">
                                <h6>PAYEMENTS</h6>
                            </div>
                            <div className="col-12">
                                <p className='txt-gray'>Sécurité des paiements à 100</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row container mt-3 mb-3 d-flex p-3 border-bottom">
                    <div className="col-4 d-flex flex-column align-items-center">
                        <div className="col">
                            <h2>
                                <Link to="/" className='txt-blue'>Jaaba</Link>
                            </h2>
                        </div>
                        <div className="col">
                            <a href='mailto:innovit@bakeli.sn' className='txt-gray'>innovit@bakeli.sn</a>
                        </div>
                        <div className="col">
                            <p className='txt-gray'>+221 77 123 45 67</p>
                        </div>
                        <div className="col d-flex justify-content-between">
                            <div className="col-3 p-2"><FiFacebook size={30} style={{ color: '#0068C8', cursor: 'pointer' }} /></div>
                            <div className="col-3 p-2"><CiTwitter size={30} style={{ color: '#0068C8', cursor: 'pointer' }} /></div>
                            <div className="col-3 p-2"><CiInstagram size={30} style={{ color: '#0068C8', cursor: 'pointer' }} /></div>
                            <div className="col-3 p-2"><PiTiktokLogo size={30} style={{ color: '#0068C8', cursor: 'pointer' }} /></div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="col">
                            <h5>À propos</h5>
                        </div>
                        <div className="col">
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <Link to="/" className='txt-gray'>Accueil</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/produits" className='txt-gray'>Produits</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row container d-flex m-0 p-0">
                    <div className="col-6 m-0 p-0">
                        <p className='txt-gray ms-2'>
                            <FaRegCopyright />&nbsp;
                            by InnovIT 2024
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer
