import React from "react";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

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
                <div key={item.id} className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-md">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                  
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
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
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Buy & Clear Cart Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
              >
                🗑 Clear Cart
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition duration-300"
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
