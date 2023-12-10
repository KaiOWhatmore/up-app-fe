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
import Feed from "./Feed";
import TransactionFeed from "./InfiniteScrollComponent"
import LandingPageBootstrap from "./LandingPageBootstrap"

function App() {

  return (
    <Router>
    <div className="App">
        <NavBar/>
        {/* <LandingPageBootstrap/> */}
        <div style={{marginTop: '15vh'}}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/barcharts" element={<BarChart />} />
          <Route path="/graphs" element={<LineChart />} />
          <Route path="/barchartspermonth" element={<BarChartAmountPerMonth />} />
          <Route path="/transactions-scroll" element={<Feed/>}/>
          <Route path="/scroll" element={<TransactionFeed/>}/>
          <Route path="/bootstrap" element={<LandingPageBootstrap/>}/>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

