import React from "react";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const handleBuyAll = () => {
    alert("Redirecting to Checkout Page...");
   
    navigate("/Checkout");

  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 rounded-lg p-4 shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover mb-4 sm:mb-0"
                  />

                  <div className="flex-1 sm:ml-4 text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden mt-4 sm:mt-0">
                    <button onClick={() => decreaseQuantity(item.id)} className="p-2 bg-gray-300 hover:bg-gray-400">
                      <FaMinus />
                    </button>
                    <span className="px-4 text-lg">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="p-2 bg-gray-300 hover:bg-gray-400">
                      <FaPlus />
                    </button>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    className="text-red-500 hover:text-red-700 text-xl mt-4 sm:mt-0"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Buy & Clear Cart Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
              >
                🗑 Clear Cart
              </button>
              <button
                onClick={handleBuyAll}
                className=" bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition duration-300 "
              >
                <FaShoppingBag /> Buy All
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
