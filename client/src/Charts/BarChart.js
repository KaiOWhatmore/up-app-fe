import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
);


const BarChart = () => {
    const [chart, setChart] = useState({data: []})  
    let proxyUrl = "/api/transactions/categories";


  useEffect(() => {
    const fetchTransactions = async () => {
        await fetch(`${proxyUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
            //   console.log(json.data);
              setChart({data: json})
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchTransactions()
  }, [proxyUrl])

  console.log("chart", chart);
  let data = {
    labels: chart?.data?.map(x => x.category),
    datasets: [{
    //   label: `${chart?.data?.length} Coins Available`,
      data: chart?.data?.map(x => x.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  let options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={400}
        options={options}
      />
    </div>
  )
}

export default BarChart
