import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiMenu, FiX } from "react-icons/fi";

export const AdminSidebar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowWidth < 1024; // Show drawer for width < 1024px (Mobile & iPad)

  return (
    <>
      {/* Drawer Toggle Button (iPad & Mobile) */}
      {isSmallScreen && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className=" flex space-x-2 justify-center bg-black text-white p-2 rounded-full  hover:bg-gray-700 transition"
        >
          <FiMenu size={24} /><p>Admin Panel</p>
        </button>
      )}

      {/* Backdrop (Closes Drawer when clicked) */}
      {isSmallScreen && isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Sidebar (Drawer for Mobile & iPad, Fixed for Desktop) */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 z-50
          transition-transform duration-300 ease-in-out
          ${isSmallScreen ? (isDrawerOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          ${isSmallScreen ? "" : "lg:sticky lg:top-0 lg:h-screen"} // Sticky on desktop
        `}
      >
        {/* Close Button (Only on Mobile & iPad) */}
        {isSmallScreen && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <FiX size={24} />
            </button>
          </div>
        )}

        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/admin-dashboard"
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
            onClick={() => isSmallScreen && setIsDrawerOpen(false)}
          >
            <FiHome size={20} /> Dashboard
          </Link>

          <Link
            to="/admin-products"
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
            onClick={() => isSmallScreen && setIsDrawerOpen(false)}
          >
            <FiBox size={20} /> Manage Products
          </Link>

          <Link
            to="/admin-orders"
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
            onClick={() => isSmallScreen && setIsDrawerOpen(false)}
          >
            <FiShoppingCart size={20} /> Orders
          </Link>

          <Link
            to="/admin-users"
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
            onClick={() => isSmallScreen && setIsDrawerOpen(false)}
          >
            <FiUsers size={20} /> Users
          </Link>
        </nav>
      </aside>
    </>
  );
};
