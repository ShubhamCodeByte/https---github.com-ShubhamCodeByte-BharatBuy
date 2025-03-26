import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductList } from "../services/GetProductList";
import { Product } from "../types/Product";
import { ProductCard } from "../components/ProductCard";
import { CategorySidebar } from "../components/CategorySidebar";
import { IoMdClose } from "react-icons/io"; // Close icon
import { FaFilter } from "react-icons/fa"; // Filter icon

export const ProductPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetProductList();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (category && category !== "all-products") {
      setFilteredProducts(
        products.filter((p) =>
          p.category === category.replace("-", " ").toLowerCase()
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Toggle Button for Mobile & Medium Screens */}
      <button
        className="lg:hidden flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md m-4 shadow-md hover:bg-blue-700 transition-all z-40"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaFilter /> Filter Categories
      </button>

      {/* Sidebar Drawer (For Mobile & Medium Screens) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 w-64 h-full shadow-lg p-4 transition-transform bg-white ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <button
            className="flex items-center gap-1 text-red-500 font-bold mb-4 hover:text-red-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <IoMdClose size={20} /> Close
          </button>
          <CategorySidebar />
        </div>
      </div>

      {/* Sidebar (Always Visible on Large Screens) */}
      <div className="hidden lg:block w-1/4 bg-white p-4 shadow-lg">
        <CategorySidebar />
      </div>

      {/* Product List Section */}
      <div className="w-full lg:w-3/4 p-2 sm:p-4 md:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-700 capitalize">
          {category ? category.replace("-", " ").toLowerCase() : "All Products"}
        </h1>

        {/* Grid Layout for Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
