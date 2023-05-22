import React from 'react';
import { Link } from 'react-router-dom';
import walletLogo from './images/wallet-filled-money-tool.png'

import './NavBar.css'

function NavBar() {
    return (
            <header>
                <img src={walletLogo} className="logo" alt="Logo" />
                <nav>
                    <ul>
                        <li><a href="/" className="nav-link">Home</a></li>
                        <li><Link to="/about" className="nav-link">About</Link></li>
                        <li><Link to="/charts" className="nav-link">Charts</Link></li>
                    </ul>
                </nav>
            </header>
    );
}

export default NavBar;
