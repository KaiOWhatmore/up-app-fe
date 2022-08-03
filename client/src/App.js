import axios from "axios"
import React, { useRef, useState, useEffect } from "react";
import * as d3 from 'd3'
import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const svgRef = useRef(); 

  useEffect(() => {
    // set up svg container 
    const w = 1500;
    const h = 500; 
    const svg = d3.select(svgRef.current)
                  .attr('width', w)
                  .attr('height', h)
                  .attr('overflow', 'visible')
                  .attr('margin-top', '75px')

    // set up the scale 
    const xScale = d3.scaleBand()
                    .domain(posts.map((val, i) => i))
                    .range([0,w])
                    .padding(0.5)
    const yScale = d3.scaleLinear()
                    .domain([0, h])
                    .range([h, 0])

    // set up the axes 
    const xAxis = d3.axisBottom(xScale)
                    .ticks(posts.length);
    const yAxis = d3.axisLeft(yScale)
                    .ticks(10); 
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
    svg.append('g')
      .call(yAxis);

    // set up the svg data 
    svg.selectAll('.bar')
        .data(posts)
        .join('rect')
          .attr('x', (v, i) => xScale(i))
          .attr('y', yScale)
          .attr('width', xScale.bandwidth())
          .attr('height', val => h - yScale(val)); 

    fetchData()
  }, [])


  const fetchData = async () => {
    const {data} = await axios.get("/api/transactions")

    setPosts(data)
  }

  let total = 0 
  let count = 0 
  return (
    <div className="App">
      <svg ref={svgRef}></svg>

      {/* {posts.map(post => (
        <header>
          <h5 key={post.id}>
              transaction {count++} 
          </h5>
            <p>{post.description}</p>
            <p>{post.amount}</p>
            <p>total: {total += Number(post.amount)}</p>
            <p>{post.settledAt}</p>
        </header>
      ))} */}
    </div>
  );
}

export default App;

