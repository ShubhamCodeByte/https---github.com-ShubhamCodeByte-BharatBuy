import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductRatingQuantity } from "../types/Product";
import { useCart } from "../context/CartContext";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductRatingQuantity | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center text-gray-500 text-xl mt-10">Loading product details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-8 mt-10">
      {/* Product Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-contain rounded-lg shadow-md"
        />
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-gray-600 mt-2 text-lg">{product.description}</p>

        {/* Category */}
        <p className="mt-4 text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-md w-fit">
          {product.category.toUpperCase()}
        </p>

        {/* Price */}
        <div className="mt-4 text-3xl font-extrabold text-green-500">${product.price}</div>

        {/* Ratings */}
        <div className="flex items-center mt-2 text-yellow-500">
          {"⭐".repeat(Math.round(product.rating.rate))}
          <span className="text-gray-500 text-sm ml-2">({product.rating.count} reviews)</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-600 transition shadow-md w-fit"
        >
          <FaCartPlus size={20} /> Add to Cart
        </button>
      </div>
    </div>
  );
};
