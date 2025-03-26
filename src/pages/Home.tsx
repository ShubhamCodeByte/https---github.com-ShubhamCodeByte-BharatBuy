import React from "react";
import Hero from "../components/Hero";
import FeaturedProduct from "../components/FeaturedProduct";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import LoginRegister from "../components/LoginRegister";

export const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedProduct />
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">Explore Categories</h2>
        <Categories />
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-l from-blue-500 to-pink-600 text-white">
        <Testimonials />
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 py-12">
        <Newsletter />
      </section>

      {/* Login/Register Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
        <LoginRegister />
      </div>
    </div>
  );
};
