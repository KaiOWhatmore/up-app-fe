import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch, RouterProvider } from 'react-router-dom';
import LandingPage from './LandingPage';
import ChartsPage from './ChartsPage';
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';
import BarChartAmountPerMonth from './Charts/BarChartAmountPerMonth'

function App() {

  return (
    <div className="App">
      {/* <BarChart /> */}
      {/* <LineChart />  */}
      <Routes>
        {/* <Route path="/barchart" element={<BarChart />} />   */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
    </div>
  );
}

export default App;

