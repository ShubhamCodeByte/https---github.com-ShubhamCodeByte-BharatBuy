import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="cursor-pointer p-2 sm:p-4 rounded-lg shadow-md shadow-slate-200 bg-white relative overflow-hidden group transition-transform transform hover:scale-105 hover:shadow-slate-300 h-64 sm:h-96 min-w-[40%] sm:min-w-3xs md:min-w-60">
      {/* Link to Product Details Page */}
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="h-24 w-24 sm:h-40 sm:w-40 mx-auto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Product Title */}
        <h2 className="text-sm sm:text-lg font-bold mt-2 sm:mt-3 text-gray-700">{product.title}</h2>
      </Link>

      {/* Price (Bottom Left) */}
      <p className="absolute bottom-2 left-2 sm:bottom-5 sm:left-5 text-green-500 font-extrabold text-xl sm:text-3xl">
        ${product.price}
      </p>

      {/* Buy Button (Bottom Right) */}
      <button
        className="absolute bottom-2 right-2 sm:bottom-5 sm:right-5 bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:bg-blue-600 transition text-xs sm:text-base"
        onClick={() => addToCart(product)}
      >
        <FaShoppingCart /> Buy
      </button>
    </div>
  );
};