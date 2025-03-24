import { Link } from "react-router-dom";
import { FaStore, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white p-6 mt-10 w-full h-80 relative">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-30">
          {/* Left Section - Logo and Company Info */}
          <div>
            <Link to="/Home" className="flex items-center text-2xl font-bold gap-2">
              <FaStore size={28} />
              BharatBuy
            </Link>
            <p className="mt-2 text-sm">© 2025 BharatBuy Pvt. Ltd.</p>
            <p className="text-sm">Registered in India | GSTIN: 123456789</p>
          </div>

          {/* Middle Left - Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link to="/products/all-products" className="hover:text-blue-300">Product</Link></li>
              <li><Link to="/Search" className="hover:text-blue-300">Search</Link></li>
              <li><Link to="/Profile" className="hover:text-blue-300">Profile</Link></li>
              <li><Link to="/LoginPage" className="hover:text-blue-300">Login</Link></li>
              <li><Link to="/Cart" className="hover:text-blue-300">Cart</Link></li>
            </ul>
          </div>

          {/* Middle Right - Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <ul className="space-y-1">
              <li><Link to="/products/all-products" className="hover:text-blue-300">All Products</Link></li>
              <li><Link to="/products/electronics" className="hover:text-blue-300">Electronics</Link></li>
              <li><Link to="/products/men's-clothing" className="hover:text-blue-300">Men's Clothing</Link></li>
              <li><Link to="/products/women's-clothing" className="hover:text-blue-300">Women's Clothing</Link></li>
              <li><Link to="/products/jewelery" className="hover:text-blue-300">Jewellery</Link></li>
            </ul>
          </div>

          {/* Right Section - Location and Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> New Delhi, India</p>
            <p className="flex items-center gap-2"><MdEmail /> support@bharatbuy.com</p>
            <p className="flex items-center gap-2"><MdPhone /> +91 9876543210</p>
          </div>
        </div>
      </footer>
      <div className="h-10 w-full text-center bg-black text-white">
        <p>All rights reserved © No copyright</p>
      </div>
    </>
  );
};
