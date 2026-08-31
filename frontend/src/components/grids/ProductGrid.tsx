// src/components/grids/ProductGrid.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  title: string;
  description: string;
  imgSrc: string;
}

const categories: Category[] = [
  {
    title: "Computers",
    description: "Laptops and desktops for work, gaming, and everyday use.",
    imgSrc: "/cards/computer.jpg",
  },
  {
    title: "Mobile & Wearables",
    description: "Smartphones, tablets, and smartwatches to stay connected.",
    imgSrc: "/cards/mobile.jpg",
  },
  {
    title: "TV & Audio",
    description: "Smart TVs, soundbars, and audio devices for home entertainment.",
    imgSrc: "/cards/tv.jpg",
  },
  {
    title: "Drones & Gadgets",
    description: "Drones, smart gadgets, and cool tech for hobbyists and creators.",
    imgSrc: "/cards/drone.jpg",
  },
  {
    title: "Accessories",
    description: "Keyboards, mice, headsets, chargers, and all essential accessories.",
    imgSrc: "/cards/accessories.jpg",
  },
  {
    title: "Gaming",
    description: "Consoles, controllers, and gear for immersive gaming experiences.",
    imgSrc: "/cards/gaming.jpg",
  },
];

// This maps to DB categogies
const categoryMap: { [key: string]: string } = {
  "Computers": "Computers",
  "Mobile & Wearables": "Mobile",    
  "TV & Audio": "TV",               
  "Drones & Gadgets": "Drones",
  "Accessories": "Accessories",
  "Gaming": "Gaming"
};

const ProductGrid: React.FC = () => {
  const navigate = useNavigate(); // ✅ Hook to navigate programmatically

  const handleExploreClick = (title: string) => {
    const dbCategory = categoryMap[title];
    if (!dbCategory) return; // safety check
    navigate(`/products/${encodeURIComponent(dbCategory)}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-12">Explore our Products</h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="card bg-base-100 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[20rem] shadow-sm"
          >
            <figure>
              <img
                src={cat.imgSrc}
                alt={cat.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cat.title}</h2>
              <p>{cat.description}</p>
              <div className="card-actions justify-end">
          
                <button
                  className="btn btn-primary"
                  onClick={() => handleExploreClick(cat.title)}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;