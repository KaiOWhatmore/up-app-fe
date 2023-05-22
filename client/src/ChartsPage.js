import React from 'react';
import { Link } from 'react-router-dom';
import './ChartsPage.css'

const ChartsPage = () => {
  return (
    <div className="charts-page-container">
      <h1>Charts</h1>
      <ul>
        <li>
          <Link to="/graphs">Graph</Link>
        </li>
        <li>
          <Link to="/barcharts">BarChart</Link>
        </li>
        <li>
          <Link to="/barchartspermonth">BarCharts Per Month</Link>
        </li>
      </ul>
    </div>
  );
}

export default ChartsPage;
