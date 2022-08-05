import axios from "axios"
import React, { useRef, useState, useEffect } from "react";
import * as d3 from 'd3'
import rd3 from 'react-d3-library'
import './App.css';

const BarChart = rd3.BarChart

function App() {
  const [state, setState] = useState([{d3: ''}]);

  useEffect(() => {

    (async () => {
        let data = {} 
        data.width = 500; 
        data.height = 750;
        data.margins = {top: 20, right: 10, bottom: 0, left: 10};
        data.yAxisLabel = 'Y VALUE';
        data.ticks = 50; 
        data.barClass = 'barChart';
        data.dataset = []; 

        const response = await axios.get("/api/transactions")
        const values = response.data
        let sum = 0 
        values.forEach(element => {
          sum += Number(element.amount)
          data.dataset.push({total: sum, date: element.createdAt})
        });
        console.log('values', values)
        console.log('dataset', data.dataset)
        console.log('state', state)
        setState({d3: data})
    }) () 
    
  }, []);

  return (
    <div className="App">
      <header className = "App-header">
        <BarChart data = {state} /> 
      </header>
    </div>
  );
}

export default App;

