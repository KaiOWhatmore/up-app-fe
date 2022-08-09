import React from "react";
import './App.css';
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';
import BarChartAmountPerMonth from './Charts/BarChartAmountPerMonth'

function App() {

  return (
    <div className="App">
      {/* <LineChart /> */}
      {/* <BarChart /> */}
      <BarChartAmountPerMonth />
    </div>
  );
}

export default App;

