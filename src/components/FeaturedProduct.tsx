import React, { useEffect, useState, useRef } from "react";
import { Product, ProductRatingQuantity } from "../types/Product";
import { ProductCard } from "./ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GetProductListWithRating } from "../services/GetProductList";

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    GetProductListWithRating().then((data) => {
      const filteredProducts = data.filter((product: ProductRatingQuantity) => product.rating?.rate > 3);
      setProducts(filteredProducts);
    });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full p-6 bg-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Featured Products</h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div key={product.id} className="snap-start flex-shrink-0 w-60 sm:w-72">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Buttons (Hidden on small screens) */}
      <button
        className="hidden md:flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        onClick={() => scroll("left")}
      >
        <FaArrowLeft />
      </button>
      <button
        className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        onClick={() => scroll("right")}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default FeaturedProduct;
