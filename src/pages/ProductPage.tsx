import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductList } from "../services/GetProductList";
import { Product } from "../types/Product";
import { ProductCard } from "../components/ProductCard";
import { CategorySidebar } from "../components/CategorySidebar";


export const ProductPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetProductList();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Filter products based on category from URL
  useEffect(() => {
    if (category && category !== "all-products") {
      setFilteredProducts(products.filter((p) => p.category === category.replace("-", " ").toLowerCase()));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <div className="flex">
      {/* Sidebar for Categories */}
      <CategorySidebar />

      {/* Product List */}
      <div className="w-5/6 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          {category ? category.replace("-", " ").toLocaleUpperCase() : "All Products"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
