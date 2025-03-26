import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GetProductList } from "../services/GetProductList";
import { Product } from "../types/Product";

interface SearchBoxProps {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBox = ({ setShowSearch }: SearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await GetProductList();
      if (searchTerm.trim()) {
        const filtered = products.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  useEffect(() => {
    inputRef.current?.focus(); // Auto-focus on input field
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setShowSearch(false);
    }
  };

  const handleSelectSuggestion = (productId: number) => {
    navigate(`/product/${productId}`);
    setShowSearch(false);
  };

  return (
    <div className="">
      {/* Search Input */}
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-gray-100 hover:shadow-md transition">
        <FiSearch size={20} className="text-gray-500 ml-3" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products..."
          className="p-3 w-full outline-none bg-transparent text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Product Suggestions */}
      {suggestions.length > 0 && (
        <ul className="mt-3 border border-gray-200 rounded-lg bg-white shadow-md divide-y divide-gray-100 overflow-hidden">
          {suggestions.slice(0, 5).map((product) => (
            <li
              key={product.id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition"
              onClick={() => handleSelectSuggestion(product.id)}
            >
              <img src={product.image} alt={product.title} className="w-10 h-10 object-cover rounded-lg shadow-sm" />
              <span className="text-sm text-gray-700 font-medium">{product.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
