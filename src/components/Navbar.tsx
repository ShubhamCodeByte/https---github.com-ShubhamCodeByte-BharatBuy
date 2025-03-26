import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { FaStore, FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { SearchBox } from "./SearchBox";

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <div>
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className=" mx-auto flex items-center justify-between p-4 relative">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900 hover:scale-125 transition  ">
              <IoArrowBack size={22} />
            </button>
            <Link to="/" className="flex items-center text-2xl font-bold  text-red-500 hover:text-red-600 transition">
              <FaStore size={28} />
              BharatBuy
            </Link>
          </div>

          <div className="hidden md:flex gap-6 text-lg">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/ProductPage" className="hover:text-blue-400 transition">Products</Link>
            <button 
              className="flex items-center gap-1 hover:text-blue-400 transition"
              onClick={() => setShowSearch(true)}
            >
              <FiSearch size={20} /> Search
            </button>
          </div>

          <div className="flex items-center gap-6">
          <button
                 onClick={() => {   
                        if (isLoggedIn) {
                           navigate("/profile");
                         } else {
                           alert("You need to log in first!");
                           navigate("/LoginPage");
                         }
                      }}
                      className="hover:text-gray-600 transition"
            >
               <User size={24} />
            </button>

            {!isLoggedIn && (
              <Link to="/LoginPage" className="hidden md:block hover:text-blue-400 transition">
                Login / Register
              </Link>
            )}
            <Link to="/Cart" className="hover:text-gray-600 transition">
              <ShoppingCart size={24} />
            </Link>
            <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col bg-white shadow-md p-4">
            <Link to="/" className="py-2 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/ProductPage" className="py-2 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Products</Link>
            <button className="py-2 flex items-center gap-1 hover:text-blue-400 transition" onClick={() => setShowSearch(true)}>
              <FiSearch size={20} /> Search
            </button>
          </div>
        )}
      </nav>

      {showSearch && (
        <div ref={searchRef} className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full md:w-1/2 bg-white shadow-lg p-4 rounded-b-xl z-50 transition-all duration-300 ease-in-out">
          <SearchBox setShowSearch={setShowSearch} />
        </div>
      )}

      <div className="pt-17"></div>
    </div>
  );
};
