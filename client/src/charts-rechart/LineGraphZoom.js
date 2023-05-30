import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
    const [zoom, setZoom] = useState(false);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sample Dataset',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                // type: 'category',
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
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
            },
        },
    };

    return (
        <div>
            <div>
                <label htmlFor="zoomCheckbox">
                    <input
                        type="checkbox"
                        id="zoomCheckbox"
                        checked={zoom}
                        onChange={() => setZoom(!zoom)}
                    />
                    Zoom
                </label>
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={{ width: '500px', height: '300px' }}>
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LineChart;
