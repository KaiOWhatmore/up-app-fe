import React, { useState, useEffect } from "react";
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
  Legend
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
      <Line
        data={data}
        height={400}
        options={options}
      />
    </div>
  )
}

export default LineChart