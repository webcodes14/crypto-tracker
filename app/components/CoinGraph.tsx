'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
  Filler,
  Legend
);

interface CoinGraphProps {
    data: number[];
}

const CoinGraph = ({ data }: CoinGraphProps) => {
    const filteredData = data.filter((_, index) => (data.length - 1 - index) % 12 === 0);

    const labels = filteredData.map((_, index) => {
        const date = new Date();
        date.setHours(date.getHours() - (filteredData.length - 1 - index) * 12);
        return date.toLocaleDateString('cs-CZ', { weekday: 'short' });
    });

    const chartData = {
        labels: labels,
        datasets: [
            {
                fill: true,
                label: 'Cena v USD',
                data: filteredData,
                borderColor: filteredData[filteredData.length - 1] >= filteredData[0]  ? '#22c55e' : '#ef4444',
                backgroundColor: 'transparent',
                tension: 0.2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
        y: {
            beginAtZero: false,
            ticks: {
                stepSize: 50
            }
        },
        x: {
            display: true,
            ticks: {
                maxTicksLimit: 7
            }
        }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <>
            <Line options={options} data={chartData} />
        </>
    )
}

export default CoinGraph;