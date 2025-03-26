import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../components/admins/AdminSidebar";
import { Order } from "../types/Order"; // Ensure you have an Order type
import axios from "axios";

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Order[]>("https://fakestoreapi.com/carts"); // FakeStore API
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const handleDelete = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Orders</h1>

        {loading ? (
          <p className="text-gray-500 text-lg text-center">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500 text-lg text-center">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">No orders available.</p>
        ) : (
          <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
            <table className="w-full min-w-[600px] border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-sm sm:text-base">
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">Order ID</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">User ID</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">Total Products</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 text-sm sm:text-base">
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">{order.id}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">{order.userId}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">{order.products.length}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-md hover:bg-red-600 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
