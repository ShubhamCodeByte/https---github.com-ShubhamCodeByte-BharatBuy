import axios from "axios";

const API_URL = "https://fakestoreapi.com";

// Fetch all users (Admin only)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch user by ID
export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Update user profile
export const updateUser = async (id: number, updatedData: object) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user (Admin only)
export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
