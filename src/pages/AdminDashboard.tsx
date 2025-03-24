import React from "react";
import { AdminSidebar } from "../components/admins/AdminSidebar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const AdminDashboard: React.FC = () => {
  // Dummy data
  const totalSales = 150000;
  const totalOrders = 245;
  const totalProducts = 120;

  // Data for Pie Chart (Orders Breakdown)
  const ordersData = [
    { name: "Completed", value: 180 },
    { name: "Pending", value: 45 },
    { name: "Cancelled", value: 20 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#FF4848"];

  // Data for Bar Chart (Sales Per Month)
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 },
    { month: "Mar", sales: 17000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 18000 },
    { month: "Jun", sales: 25000 },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Total Sales */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-2xl font-bold mt-2">${totalSales.toLocaleString()}</p>
          </div>

          {/* Total Orders */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold mt-2">{totalOrders}</p>
          </div>

          {/* Total Products */}
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-2xl font-bold mt-2">{totalProducts}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Pie Chart for Orders Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Status Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={ordersData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                  {ordersData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Sales Per Month */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};
