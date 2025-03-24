import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../types/Product";
import { GetProductList } from "../services/GetProductList";
import { ProductCard } from "../components/ProductCard";

export const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetProductList();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        Search Results for "{searchQuery}"
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No products found.</p>
      )}
    </div>
  );
};
