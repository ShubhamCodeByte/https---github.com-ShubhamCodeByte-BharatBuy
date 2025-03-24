import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBox, FiShoppingCart, FiUsers } from "react-icons/fi";

export const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64  bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      
      <nav className="flex flex-col gap-4">
        <Link to="/admin-dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded">
          <FiHome size={20} /> Dashboard
        </Link>

        <Link to="/admin-products" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded">
          <FiBox size={20} /> Manage Products
        </Link>

        <Link to="/admin-orders" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded">
          <FiShoppingCart size={20} /> Orders
        </Link>

        <Link to="/admin-users" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded">
          <FiUsers size={20} /> Users
        </Link>
      </nav>
    </aside>
  );
};
