import React from 'react';
import { Line } from 'react-chartjs-2';
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
import { useAdmin } from '../../context/AdminContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = () => {
    const { orders } = useAdmin();

    // Generate last 7 days labels
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    // Calculate sales for each day
    const dailySales = labels.map(label => {
        const dateStr = label.split(', ')[1];
        return orders
            .filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate.getDate().toString() === dateStr;
            })
            .reduce((sum, order) => sum + order.price, 0);
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Daily Sales ($)',
                data: dailySales,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Last 7 Days Sales',
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <Line options={options} data={data} />
        </div>
    );
};

export default SalesChart;