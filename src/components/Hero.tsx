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
      const bestProducts = categories.map((category) => {
        return data
          .filter((product: ProductRatingQuantity) => product.category === category)
          .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))[0];
      });
      setFeaturedProducts(bestProducts);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredProducts]);

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentIndex];

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white flex items-center justify-center">
      {/* Background Image */}
      <img
        src={currentProduct.image}
        alt={currentProduct.title}
        className="absolute w-full h-full object-cover opacity-50"
      />

      {/* Overlay Content */}
      <div className="relative z-10 text-center p-6">
        <h1 className="text-4xl font-bold">Discover the Best in {currentProduct.category}</h1>
        <p className="mt-2 text-lg italic">"Quality products for a better life"</p>

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
