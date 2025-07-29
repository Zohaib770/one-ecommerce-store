import React, { createContext, useEffect, useContext, useState } from 'react';
import { Product, Order } from '../types/Interface';
import Apis from '../api/Apis';

interface AdminContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    products: Product[];
    orders: Order[];
    stats: {
        totalSales: number;
        monthlySales: number;
        totalProducts: number;
        pendingOrders: number;
    };
    fetchProducts: () => Promise<void>;
    fetchOrders: () => Promise<void>;
    //updateOrderStatus: (orderId: string, status: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const { fetchAllProducts, fetchAllOrders } = Apis();
    const stats = {
        totalSales: orders.reduce((sum, order) => sum + order.price, 0),
        monthlySales: orders
            .filter(order => new Date(order.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
            .reduce((sum, order) => sum + order.price, 0),
        totalProducts: products.length,
        pendingOrders: orders.filter(order => order.status === 'pending').length,
    };

    const getAllProducts = async () => {
        const response = await fetchAllProducts();
        if (response) {
            setProducts(response.data);
        }
    };

    const getAllOrders = async () => {
        const response = await fetchAllOrders();
        if (response) {
            setOrders(response.data);
        }
    };

    useEffect(() => {
        getAllProducts();
        getAllOrders();
    }, []);

    return (
        <AdminContext.Provider value={{
            activeTab,
            setActiveTab,
            products,
            orders,
            stats,
            fetchProducts: getAllProducts,
            fetchOrders: getAllOrders,
            //updateOrderStatus: async () => { },
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};