import { Link, useParams } from "react-router-dom";

const categories = ["All Products", "Electronics", "Men's Clothing", "Women's Clothing", "Jewelery"];

export const CategorySidebar: React.FC = () => {
  const { category } = useParams<{ category?: string }>();

  return (
    <div className=" p-5 bg-gradient-to-b from-gray-100 to-gray-200 h-full shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <Link
              to={`/products/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`block py-2 px-4 rounded-lg text-gray-700 font-medium transition ${
                category === cat.toLowerCase().replace(/\s+/g, "-")
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "hover:bg-blue-200"
              }`}
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
