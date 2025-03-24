import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", image: "https://static.vecteezy.com/system/resources/previews/035/872/328/large_2x/ai-generated-technology-background-with-abstract-electronic-circuit-board-photo.jpg" },
  { name: "Women's Clothing", image: "https://img.freepik.com/premium-photo/ai-generated-model-wearing-avantgarde-fashion-with-bold-designs_1290175-7678.jpg" },
  { name: "Jewelery", image: "https://imgv3.fotor.com/images/gallery/a-purple-crystal-ring.jpg" },
  { name: "Men's Clothing", image: "https://miro.medium.com/v2/resize:fit:3584/1*CRZlTP9strphIF1oZEUptA.jpeg" }
];

const Categories: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
      {categories.map((category) => (
        <Link 
          key={category.name} 
          to={`/products/${category.name.toLowerCase().replace(/\s+/g, "-")}`} 
          className="relative group cursor-pointer"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-40 object-cover rounded-lg group-hover:opacity-80 transition"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-lg font-semibold">{category.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
