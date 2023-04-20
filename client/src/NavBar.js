import React from 'react';
import { Link } from 'react-router-dom';
import steamedHams from './images/steamed-hams.jpg'

import './navbar.css'

function NavBar() {
    return (
        <header>
            <img src={steamedHams} className="logo" alt="Logo" />
            <nav>
                <ul>
                    <li><Link to="/charts" className="nav-link">Charts</Link></li>
                    <li><Link to="/about" className="nav-link">About</Link></li>
                    <li><a href="#" className="nav-link">Tab N</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
