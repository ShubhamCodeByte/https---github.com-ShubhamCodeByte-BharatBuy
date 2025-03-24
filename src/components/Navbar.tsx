import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { FaStore } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import { SearchBox } from "./SearchBox";

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const [showSearch, setShowSearch] = useState(false);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      alert("Please login or register to access your profile.");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="bg-white text-black p-4 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900 hover:scale-125 transition flex items-center absolute left-6">
          <IoArrowBack size={22} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl text-red-500 font-bold gap-2 hover:text-red-300">
          <FaStore size={28} />
          BharatBuy
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-lg">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/ProductPage" className="hover:text-blue-300">Product</Link>

          {/* Search Dropdown */}
          <div className="relative">
            <button
              className="hover:text-blue-300 flex items-center gap-1"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FiSearch size={20} /> Search
            </button>

            {showSearch && <SearchBox />}
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex gap-6 items-center">
          <button onClick={handleProfileClick} className="hover:text-gray-300">
            <User size={24} />
          </button>

          {!isLoggedIn && (
            <Link to="/LoginPage" className="hover:text-blue-300">Login / Register</Link>
          )}

          <Link to="/Cart" className="hover:text-gray-300">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};
