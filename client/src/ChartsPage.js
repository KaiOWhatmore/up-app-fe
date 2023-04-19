import React from 'react';
import { Link } from 'react-router-dom';

const ChartsPage = () => {
  return (
    <div>
      <h1>Charts</h1>
      <ul>
        <li>
          <Link to="/graphs">Graph</Link>
        </li>
        <li>
          <Link to="/barcharts">BarChart</Link>
        </li>
      </ul>
    </div>
  );
}

export default ChartsPage;
