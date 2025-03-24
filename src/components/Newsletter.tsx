import React from "react";

const Newsletter: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-12 px-6 text-center rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">Stay Updated!</h2>
      <p className="mt-2 text-lg font-medium opacity-90">Get the latest updates, exclusive deals, and trends directly in your inbox.</p>
      
      <div className="mt-6 flex justify-center items-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-1 rounded-full flex items-center shadow-lg">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-5 py-3 rounded-l-full text-gray-900 focus:outline-none bg-transparent placeholder-gray-300"
          />
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-r-full font-semibold hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
