import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { FiMenu, FiX, FiHome, FiBox, FiShoppingCart, FiUsers, FiLogOut } from 'react-icons/fi';
import { useAuth } from "../../context/AuthContext";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeTab, setActiveTab } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingCart /> },
    { id: 'products', label: 'Products', icon: <FiBox /> },
    { id: 'users', label: 'Users', icon: <FiUsers /> },
  ];

  const currentTabLabel = menuItems.find(item => item.id === activeTab)?.label || 'Admin';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      {/* Universal Header/Navbar */}
      <header className="sticky top-0 z-40 bg-white shadow-md p-4 flex items-center justify-between">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        <h1 className="text-xl font-bold text-center flex-1">
          {currentTabLabel}
        </h1>

        <div className="w-6"></div> {/* Spacer */}
      </header>


      {/* Menu Panel with slide animation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header with Close Button */}
        <div className="p-4 border-b flex justify-between items-center h-16">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <ul className="p-4 space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}

          <li className="border-t mt-4 pt-4">
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-600"
            >
              <span className="mr-3"><FiLogOut /></span>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content (always fully visible) */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;