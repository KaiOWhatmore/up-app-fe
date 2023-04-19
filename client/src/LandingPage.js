import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to my App</h1>
      <Link to="/charts">
        <button>Charts</button>
      </Link>
    </div>
  );
}

export default LandingPage;
