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
import './LineChart.css'

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

  const [chart, setChart] = useState({ data: [] })
  let proxyUrl = "/api/transactions/curt/runningTotal";

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
              setChart({ data: json });
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchTransactions()
  }, [proxyUrl])

  let data = {
    labels: chart?.data?.map(x => x.settledAt),
    datasets: [{
      label: `${chart?.data?.length} Transactions Present`,
      data: chart?.data?.map(x => x.runningTotalDouble),
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: 'rgb(128, 0, 0, 0.5)',
      borderWidth: 1,
      tension: 0.5
    }]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
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
          mode: 'x',
        }
      }
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }

  return (
    <div className="chart-container">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <div style={{ width: '1600px', height: '700px' }}>
          <Line
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  )
}

export default LineChart