import React from 'react';
import { useAdmin } from '../../context/AdminContext';

const RecentActivity = () => {
    const { orders } = useAdmin();

    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
                {recentOrders.map((order) => (
                    <div key={order._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">Order #{order._id.slice(-6)}</p>
                                <p className="text-sm text-gray-500">{order.personalDetail.fullName}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm mt-1">${order.price.toFixed(2)} • {new Date(order.createdAt).toLocaleTimeString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;