import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  // const xValues = 
  
  // Sample data for the line graph
  // const labels = Utils.months({count: 7});
  // const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const labels = ['a','b','c','d','e'];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [50,60,70,80,90,100,110,120,130,140,150],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.5
    }]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        // type: 'category',
        position: 'bottom',
      },
      y: {
        // type: 'linear',
        position: 'left',
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '500px', height: '300px' }}>
        <Line data={data} options={options} plugins={['zoom']}/>
      </div>
    </div>
  );
};

export default LineChart;
