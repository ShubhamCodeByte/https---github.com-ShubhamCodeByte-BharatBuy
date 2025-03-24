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
      <section className="container mx-auto py-12">
        
        <FeaturedProduct />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Explore Categories</h2>
        <Categories />
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto py-12 bg-gradient-to-l from-blue-500 to-pink-600 text-white">

        <Testimonials />
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto py-12">
        <Newsletter />
      </section>

      {/* Login/Register Section */}
      <div className=" bottom-0 w-full">
        <LoginRegister />
      </div>

    
    </div>
  );
};
