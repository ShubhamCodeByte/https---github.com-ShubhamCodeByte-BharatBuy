import React, { useState } from "react";
import { z } from "zod";

// Define Zod Schema for validation
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input data using Zod
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Check if user already exists
    if (localStorage.getItem("user")) {
      alert("User already registered! Please login.");
      return;
    }

    // Save user data and fake JWT token in localStorage
    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("token", "fake-jwt-token");

    alert("Registration successful!");
    setFormData({ username: "", email: "", phone: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-semibold mb-6 text-gray-800">Register</h3>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-md">
        <input type="text" name="username" placeholder="Username"
          className="border p-3 rounded-xl" value={formData.username} onChange={handleChange} />
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <input type="email" name="email" placeholder="Email"
          className="border p-3 rounded-xl" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input type="text" name="phone" placeholder="Phone Number"
          className="border p-3 rounded-xl" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        <input type="password" name="password" placeholder="Password"
          className="border p-3 rounded-xl" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-xl">
          Register
        </button>
      </form>
    </div>
  );
};
