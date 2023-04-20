import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';
import NavBar from './NavBar';
import square from './images/square.png'
import steamedHams from './images/steamed-hams.jpg'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <NavBar />
      <h2 className="title">Seymour</h2>

      <p className="description">An app for visualising your personal finances</p>
      <Link to="/charts">
        <button className="button">Charts</button>
      </Link>
    </div>
  );
}

export default LandingPage;