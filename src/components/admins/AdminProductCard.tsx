// import React, { useState } from "react";
import { deleteProduct } from "../../services/DeleteProduct";
import { ProductRatingQuantity } from "../../types/Product";
import { useNavigate } from "react-router-dom";

interface AdminProductCardProps {
  product: ProductRatingQuantity;
  onProductDeleted: (id: number) => void;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({ product, onProductDeleted }) => {
  const navigate = useNavigate();

  // Handle Delete Product
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(product.id);
        onProductDeleted(product.id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div
      className="relative cursor-pointer rounded-lg p-4 shadow-md bg-white group transition-transform duration-300 hover:shadow-lg min-w-40"
      onClick={() => navigate(`/admin/product/${product.id}`)}
    >
      <div className="flex justify-center overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="h-32 object-cover mb-2 transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h2 className="text-lg font-semibold truncate">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>

      <div className="flex justify-between mt-3 relative flex-col gap-1 md:flex-row">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-4xl hover:bg-blue-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/edit-product/${product.id}`);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-4xl hover:bg-red-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};