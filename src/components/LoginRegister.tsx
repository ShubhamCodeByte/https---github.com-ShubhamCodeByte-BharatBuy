import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-30">
      <h2 className="text-2xl font-bold mb-4">Join Us Today!</h2>
      <p className="mb-6 text-gray-600 text-center">Sign in or create an account to enjoy seamless shopping.</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/LoginPage")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/LoginPage")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
