import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../UserDashboard.css'

const MenuDashboard = () => {
    const [isExpanded, setIsExpanded] = useState(true)
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <>
            <aside id="sidebar" className={`${isExpanded ? 'expand' : ''}`}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={handleToggle}>
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <div className="sidebar-logo">
                        <a href="/">Jaaba</a>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/" className="sidebar-link">
                            {/*<i className="lni lni-user"></i>*/}
                            <i className="lni lni-home"></i>
                            <span>Accueil</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/profile" className="sidebar-link">
                            <i className="lni lni-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/boutique" className="sidebar-link">
                            <i className="lni lni-cart-full"></i>
                            <span>Boutiques</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/produits" className="sidebar-link">
                            <i className="lni lni-agenda"></i>
                            <span>Produits</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/userDashboard/notifications" className="sidebar-link">
                            <i className="lni lni-popup"></i>
                            <span>Notification</span>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <a href="#" className="sidebar-link">
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
        </>
    )
}

export default MenuDashboard
