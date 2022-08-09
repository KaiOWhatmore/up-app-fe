import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
);


const BarChartAmountPerMonth = () => {
    const [chart, setChart] = useState({data: []})  
    let proxyUrlMonthlySavings = "/api/transactions/monthly-savings/";
    let proxyUrlMonthlyIncome = "/api/transactions/monthly-income/";
    let proxyUrlMonthlyExpenses = "/api/transactions/monthly-expenses/";
    
    
  useEffect(() => {
    const fetchTransactions = async () => {
        await fetch(`${proxyUrlMonthlySavings}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              setChart({data: json})
            });
          }
        }).catch((error) => {
          console.log(error);
        });

    await fetch(`${proxyUrlMonthlyIncome}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              setChart({data: json})
            });
          }
        }).catch((error) => {
          console.log(error);
        });

    await fetch(`${proxyUrlMonthlyExpenses}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              setChart({data: json})
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };

    fetchTransactions()
  }, [proxyUrlMonthlyExpenses, proxyUrlMonthlyIncome, proxyUrlMonthlySavings])

  console.log("chart", chart);
  let data = {
    labels: chart?.data?.map(x => x.month),
    datasets: [{
      data: chart?.data?.map(x => x.sum),
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

export default BarChartAmountPerMonth
