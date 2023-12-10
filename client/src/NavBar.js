import React from 'react';
import { Link } from 'react-router-dom';
import walletLogo from './images/wallet-filled-money-tool.png';

import './NavBar.css'; // make sure to import your custom CSS for added styles

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto"> {/* Adding ml-auto here */}
                    <li className="nav-item active custom-nav-item"> {/* Adding custom-nav-item for spacing */}
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item custom-nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item custom-nav-item">
                        <Link className="nav-link" to="/charts">Charts</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
