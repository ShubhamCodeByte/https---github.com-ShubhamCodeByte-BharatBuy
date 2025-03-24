import React, { useEffect, useState } from "react";
import { Product,ProductRatingQuantity } from "../types/Product";
import { ProductCard } from "./ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GetProductListWithRating } from "../services/GetProductList";

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    GetProductListWithRating().then((data) => {
      const filteredProducts = data.filter((product: ProductRatingQuantity) => product.rating?.rate > 3);
      setProducts(filteredProducts);
    });
  }, []);

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 300, 0));
  };

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + 300, products.length * 200));
  };

  return (
    <div className="relative w-full p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 transition-transform"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/* Scroll Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        onClick={scrollLeft}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        onClick={scrollRight}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default FeaturedProduct;
