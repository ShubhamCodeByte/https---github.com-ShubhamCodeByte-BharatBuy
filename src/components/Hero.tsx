import React, { useState, useEffect } from "react";
import { ProductRatingQuantity } from "../types/Product";
import { Link } from "react-router-dom";
import { GetProductListWithRating } from "../services/GetProductList";

const Hero: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductRatingQuantity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    GetProductListWithRating().then((data) => {
      const categories = [...new Set(data.map((product: ProductRatingQuantity) => product.category))];
      const bestProducts = categories.map((category) =>
        data
          .filter((product) => product.category === category)
          .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))[0]
      );
      setFeaturedProducts(bestProducts);
    });
  }, []);

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 4000); // Slower transition for better UX
    return () => clearInterval(interval);
  }, [featuredProducts]);

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentIndex];

  return (
    <div className="relative w-full min-h-[70vh] md:min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {/* Background Image */}
      <img
        src={currentProduct.image}
        alt={currentProduct.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Overlay Content */}
      <div className="relative z-10 text-center p-6 max-w-2xl mx-auto animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
          Discover the Best in {currentProduct.category}
        </h1>
        <p className="mt-3 text-base md:text-lg italic text-gray-200">
          "Quality products for a better life"
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to={`/products/${currentProduct.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="border-white border-2 bg-opacity-20 text-white px-6 py-2 rounded-lg hover:bg-opacity-40 transition"
          >
            Browse {currentProduct.category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
