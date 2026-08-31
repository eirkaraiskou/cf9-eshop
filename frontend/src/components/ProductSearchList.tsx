import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const ProductSearchList: React.FC = () => {
  const navigate = useNavigate();
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length >= 4) {
      debounceRef.current = window.setTimeout(() => {
        fetchResults(value);
      }, 500);
    } else {
      setResults([]);
    }
  };

  const fetchResults = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:8080/api/products/search?query=${encodeURIComponent(
          searchTerm
        )}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search API error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
    handleClear();
  };

  const handleShowAll = () => {
    navigate(`/products/search/${encodeURIComponent(query)}`);
    handleClear();
  };

  return (
    <div className="relative w-full hidden sm:block">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="input input-bordered w-full"
      />
      {query && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-xs"
          onClick={handleClear}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className="absolute z-50 w-full mt-1 p-2 bg-base-100 rounded-box shadow">
          Loading...
        </div>
      )}

      {/* No results */}
      {!loading && results.length === 0 && query.length >= 4 && (
        <div className="absolute z-50 w-full mt-1 p-2 bg-base-100 rounded-box shadow text-gray-600 text-center">
          No products found for "{query}"
        </div>
      )}

      {/* Results list */}
      {!loading && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 dropdown-content menu p-2 shadow bg-base-100 rounded-box">
          {results.slice(0, 4).map((product) => (
            <li
              key={product.id}
              className="hover:bg-gray-100 cursor-pointer p-2"
              onClick={() => handleProductClick(product.id)}
            >
              {product.category} | {product.name} - {product.price.toFixed(2)}€
            </li>
          ))}

          {results.length > 4 && (
            <li className="text-center mt-1">
              <button
                className="btn btn-sm btn-outline w-full"
                onClick={handleShowAll}
              >
                Show all
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductSearchList;