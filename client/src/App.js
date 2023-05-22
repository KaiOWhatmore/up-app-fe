import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ChartsPage from './ChartsPage';
import AboutPage from "./AboutPage";
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';
import BarChartAmountPerMonth from './Charts/BarChartAmountPerMonth'
import NavBar from "./NavBar";

function App() {

  return (
    <Router>
    {/* // <div className="App"> */}
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/barcharts" element={<BarChart />} />
          <Route path="/graphs" element={<LineChart />} />
          <Route path="/barchartspermonth" element={<BarChartAmountPerMonth />} />
        </Routes>
        {/* </div> */}
    </Router>
  );
}

export default App;

