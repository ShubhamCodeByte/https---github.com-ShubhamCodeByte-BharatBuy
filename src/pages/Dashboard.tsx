import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(false);

  // Load admin token and user details from localStorage on component mount
  useEffect(() => {
    const userToken = localStorage.getItem("adminToken");
    const storedUserName = localStorage.getItem("userName") || "User";
    setUserName(storedUserName);
    
    if (userToken) {
      setIsAdmin(true);

      // Load Admin Data if Token Exists
      const storedAdminData = localStorage.getItem("adminData");
      if (storedAdminData) {
        setAdminData(JSON.parse(storedAdminData));
      }
    }
  }, []);

  const handleAdminAccess = async () => {
    setLoading(true);
    try {
      const response = await fetch("/admin.json");

      if (!response.ok) throw new Error("Failed to fetch admin data");

      const data = await response.json();

      console.log("🔍 Admin Data Fetched:", data); // Debugging log

      if (data.adminUser && data.adminPassword && data.adminToken) {
        setAdminData(data);
        localStorage.setItem("adminToken", data.adminToken);
        localStorage.setItem("userName", data.adminUser); // Store admin username
        localStorage.setItem("adminData", JSON.stringify(data)); // Store admin data for reloads
        
        setUserName(data.adminUser);
        setIsAdmin(true);
        alert("✅ Admin Access Granted! Redirecting to Admin Dashboard...");
        navigate("/admin-dashboard");
      } else {
        throw new Error("Invalid admin data received");
      }
    } catch (error) {
      console.error("❌ Error fetching admin data:", error);
      alert("⚠️ Failed to fetch admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("adminData");
    setIsAdmin(false);
    setAdminData(null);
    navigate("/");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600 min-h-screen flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome, {userName}!</h1>
      <p className="text-lg mb-6 text-center">Manage your activities efficiently with your dashboard.</p>

      {isAdmin ? (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center text-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-red-500">Admin Dashboard</h2>

          {/* Show loading state */}
         
  <>
    <p className="mb-2"><strong>Username:</strong> {userName }</p>
   
  </>


          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
            >
              Go to Admin Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAdminAccess}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
          disabled={loading}
        >
          {loading ? "Loading..." : "Request Admin Access"}
        </button>
      )}
    </div>
  );
};
