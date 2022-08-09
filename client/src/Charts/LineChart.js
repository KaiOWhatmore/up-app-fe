import React, { useState, useEffect } from "react";
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  zoomPlugin
);


const LineChart = () => {

  const [chart, setChart] = useState({data: []})  
  let proxyUrl = "/api/transactions";

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
                let totalAmount = 0;
                json.forEach(element => {
                    totalAmount += Number(element.amount); 
                    element.total = totalAmount;
                })
                setChart({data: json});
            });
        }
    }).catch((error) => {
        console.log(error);
    });
    };
    fetchTransactions()
  }, [ proxyUrl])

   let data = {
     labels: chart?.data?.map(x => x.settledAt),
     datasets: [{
       label: `${chart?.data?.length} Transactions Present`,
       data: chart?.data?.map(x => x.total),
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
       borderColor: 'rgb(128, 0, 0, 0.5)',
       borderWidth: 0.5
     }]
   };

  let options = {
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        }
      }
    },
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
      <Line
        data={data}
        height={500}
        options={options}
      />
    </div>
  )
}

export default LineChart