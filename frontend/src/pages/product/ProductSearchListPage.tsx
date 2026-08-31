import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../product/ProductCard';
import type { Product } from '../product/ProductCard';

interface ProductSearchListPageProps {
  query: string;
}

const ProductSearchListPage: React.FC<ProductSearchListPageProps> = ({ query }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(`http://localhost:8080/api/products/search?query=${query}`);
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load search results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (products.length === 0) return <div className="text-center mt-10">No results found for "{query}"</div>;

  // Group products by subcategory (like ProductsByCategory)
  const grouped = Array.from(
    products.reduce((map, product) => {
      if (!map.has(product.subcategory)) map.set(product.subcategory, []);
      map.get(product.subcategory)!.push(product);
      return map;
    }, new Map<string, Product[]>())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {grouped.map(([subcategory, items]) => (
        <div key={subcategory} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">{subcategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSearchListPage;