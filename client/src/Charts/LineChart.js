import React, { useState, useEffect, useMemo } from "react";
import zoomPlugin from 'chartjs-plugin-zoom';
import moment from 'moment'
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
      try {
        const cachedData = localStorage.getItem("cachedChartData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setChart({ data: parsedData });
        } else {
          const response = await fetch(proxyUrl);
          if (response.ok) {
            const data = await response.json();
            setChart({ data });
            localStorage.setItem("cachedChartData", JSON.stringify(data))
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactions();
  }, [proxyUrl]);

  const data = useMemo(() => {
    return {
      labels: chart.data.map(x => moment(x.settledAt).format('MMM YY')),
      datasets: [{
        label: `${chart.data.length} Transactions Present`,
        data: chart.data.map(x => x.runningTotalDouble),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgb(128, 0, 0, 0.5)',
        borderWidth: 1,
        tension: 0
      }]
    };
  }, [chart.data]);

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '65vw', height: '60vh' }}>
          <Line
            data={data}
            options={options}
          />
        </div>
    </div>
  )
}

export default LineChart