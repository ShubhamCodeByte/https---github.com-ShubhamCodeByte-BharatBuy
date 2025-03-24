import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
// import { Search } from "./pages/Search";
import { Cart } from "./pages/Cart";
import { LoginPage } from "./authentications/LoginPage";

import { CartProvider } from "./context/CartContext";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Profile } from "./authentications/Profile";
import { ProductDetails } from "./pages/ProductDetails";


import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminOrders } from "./pages/AdminOrders";
import { AdminUsers } from "./pages/AdminUsers";
import {EditProductPage} from "./pages/EditProductPage";
// import AdminProductCard from "./components/AdminProductCard";







const App = () => {
  return (

    <CartProvider>
    <Router>
      <Navbar />
      <div className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          {/* <Route path="/Search" element={<Search />} /> */}
          <Route path="/Cart" element={<Cart />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          {/* <Route path="/Profile" element={<Profile />} /> */}
          <Route path="/products/:category?" element={<ProductPage />} />
          <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-products" element={<AdminProducts />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
        <Route path="/admin-products" element={<AdminProducts />} />
        <Route path="/admin/edit-product/:id" element={<EditProductPage />} />

        </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
    </CartProvider>

  );
};

export default App;
