import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: "", address: "", email: "" });

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!userDetails.name || !userDetails.address || !userDetails.email) {
      alert("Please fill in all details");
      return;
    }

    alert("Payment Successful! Your order is confirmed.");
    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Checkout</h1>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <p className="text-lg font-medium text-gray-700">{item.title} (x{item.quantity})</p>
                <p className="text-lg font-semibold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
          )}
        </div>

        {/* Total Amount */}
        {cart.length > 0 && (
          <h2 className="text-xl font-semibold text-gray-800 text-right mb-6">Total: ${totalAmount.toFixed(2)}</h2>
        )}

        {/* User Details Form */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            value={userDetails.address}
            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          />
        </div>

        {/* Checkout Button */}
        {cart.length > 0 && (
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 hover:bg-green-600 transition duration-300 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg"
          >
            Confirm & Pay
          </button>
        )}
      </div>
    </div>
  );
};
