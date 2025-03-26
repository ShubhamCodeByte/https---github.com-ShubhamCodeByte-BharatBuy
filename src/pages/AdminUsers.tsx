import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../components/admins/AdminSidebar";
import { getAllUsers, updateUser, deleteUser } from "../services/User";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";

interface User {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  phone: string;
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle user update
  const handleUpdateUser = async (id: number) => {
    try {
      await updateUser(id, updatedUser);
      setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)));
      setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Users</h1>

        {loading ? (
          <p className="text-gray-500 text-lg text-center">Loading users...</p>
        ) : (
          <div className="overflow-x-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <table className="w-full min-w-[600px] border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-sm sm:text-base">
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">Phone</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 text-sm sm:text-base">
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">{user.id}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          value={updatedUser.username || user.username}
                          onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                          className="border p-1 w-full max-w-xs rounded-md"
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">{user.email}</td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 text-center">
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          value={updatedUser.phone || user.phone}
                          onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                          className="border p-1 w-full max-w-xs rounded-md"
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 sm:px-4 py-2 flex justify-center gap-2 sm:gap-3">
                      {editingUserId === user.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateUser(user.id)}
                            className="text-green-500 hover:text-green-700 p-2"
                          >
                            <FiSave size={20} />
                          </button>
                          <button
                            onClick={() => setEditingUserId(null)}
                            className="text-gray-500 hover:text-gray-700 p-2"
                          >
                            <FiX size={20} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingUserId(user.id)}
                            className="text-blue-500 hover:text-blue-700 p-2"
                          >
                            <FiEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
