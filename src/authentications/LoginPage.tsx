import React, { useState } from 'react';
import { Login } from '../components/Login';
import { Register } from '../components/Register';

export const LoginPage: React.FC = () => {
  const [isOnLogin, setIsOnLogin] = useState<boolean>(true);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl flex w-2/3">
        {/* Left Side - Quotes Section */}
        <div className="w-1/2 flex flex-col justify-center items-center p-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-l-2xl">
          <blockquote className="text-lg italic text-center">
            {isOnLogin 
              ? "Secure your account and unlock endless possibilities." 
              : "Join us and take the first step towards success!"
            }
          </blockquote>
          <button
            className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-xl hover:from-green-500 hover:to-blue-600 transition shadow-lg"
            onClick={() => setIsOnLogin(!isOnLogin)}
          >
            {isOnLogin ? "New User? Register" : "Already have an account? Login"}
          </button>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-1/2 p-6">
          {isOnLogin ? <Login  /> : <Register  />}
        </div>
      </div>
    </div>
  );
};
