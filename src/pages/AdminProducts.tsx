import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../components/admins/AdminSidebar";
import { AdminProductCard } from "../components/admins/AdminProductCard";
import { GetProductListWithRating } from "../services/GetProductList";
import { ProductRatingQuantity } from "../types/Product";

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductRatingQuantity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await GetProductListWithRating();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleEdit = (updatedProduct: ProductRatingQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Products</h1>
        
        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p className="text-center text-lg">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <AdminProductCard key={product.id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
