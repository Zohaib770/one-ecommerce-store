import React from 'react';
import { useAdmin } from '../../context/AdminContext';

const DashboardStats = () => {
  const { stats } = useAdmin();

  const statCards = [
    { title: 'Total Sales', value: `$${stats.totalSales.toFixed(2)}`, icon: '💰' },
    { title: 'Monthly Sales', value: `$${stats.monthlySales.toFixed(2)}`, icon: '📅' },
    { title: 'Total Products', value: stats.totalProducts, icon: '🛍️' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: '⏳' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;