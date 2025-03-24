import React, { useState } from "react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("No user found! Please register.");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email === email && user.password === password) {
      localStorage.setItem("token", "fake-jwt-token");
      alert("Login successful!");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-semibold mb-6 text-gray-800">Login</h3>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-md">
        <input type="email" placeholder="Email"
          className="border p-3 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          className="border p-3 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
};
