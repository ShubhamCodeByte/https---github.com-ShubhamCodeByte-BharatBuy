import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../services/UpdateProduct";
import { GetSingleProduct } from "../services/GetSingleProduct";
import { ProductRatingQuantity } from "../types/Product";

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductRatingQuantity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await GetSingleProduct(Number(id));
        setProduct(data);
      } catch (error) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEdit = async () => {
    if (!product) return;
    try {
      await updateProduct(Number(id), product);
      navigate("/admin-products", { state: { updatedProduct: product } });
    } catch (error) {
      setError("Failed to update product.");
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        className="w-full border p-2 rounded mb-2"
        value={product?.title || ""}
        onChange={(e) => setProduct({ ...product!, title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2 rounded mb-2"
        value={product?.price || ""}
        onChange={(e) => setProduct({ ...product!, price: parseFloat(e.target.value) })}
      />
      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded mb-2"
        value={product?.description || ""}
        onChange={(e) => setProduct({ ...product!, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        className="w-full border p-2 rounded mb-2"
        value={product?.category || ""}
        onChange={(e) => setProduct({ ...product!, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="w-full border p-2 rounded mb-2"
        value={product?.image || ""}
        onChange={(e) => setProduct({ ...product!, image: e.target.value })}
      />
      <input
        type="number"
        placeholder="Rating"
        className="w-full border p-2 rounded mb-2"
        value={product?.rating?.rate || ""}
        onChange={(e) => setProduct({ ...product!, rating: { ...product!.rating, rate: parseFloat(e.target.value) } })}
      />
      <div className="flex justify-end gap-4 mt-3">
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => navigate("/admin-products")}>Cancel</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleEdit}>Save</button>
      </div>
    </div>
  );
};
