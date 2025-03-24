import React from "react";
import { useNavigate } from "react-router-dom";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center">User Profile</h1>
      <div className="flex flex-col items-center mt-4">
        <img
          src={`https://api.dicebear.com/6.x/identicon/svg?seed=${user.username}`}
          alt="Profile"
          className="w-24 h-24 rounded-full shadow-md"
        />
        <p className="text-lg font-semibold mt-2">{user.username}</p>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-gray-500">{user.phone}</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
