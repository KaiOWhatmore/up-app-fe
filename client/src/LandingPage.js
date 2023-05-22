import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2 className="title">Seymour</h2>
      <p className="description">An app for visualising your personal finances</p>
      <Link to="/charts">
        <button className="button">Charts</button>
      </Link>
    </div>
  );
}

export default LandingPage;