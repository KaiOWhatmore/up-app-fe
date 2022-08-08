import React from "react";
import './App.css';
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';

function App() {

  return (
    <div className="App">
      <LineChart />
      <BarChart />
    </div>
  );
}

export default App;

