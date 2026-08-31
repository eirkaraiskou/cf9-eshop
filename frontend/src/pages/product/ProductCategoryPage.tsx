import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import ProductCard from '../product/ProductCard';
import type { Product } from '../product/ProductCard';
import ProductFilter from '../../components/ProductFilter';
import ProductEditModal from '../../components/modals/ProductEdit';

interface ProductsByCategoryProps {
  category: string;
}

const ProductsByCategory: React.FC<ProductsByCategoryProps> = ({ category }) => {
  const { isAdmin } = useAuth();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    subcategory: '',
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(
          `http://localhost:8080/api/products/category/${encodeURIComponent(category)}`
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSubcategory = filters.subcategory
        ? p.subcategory === filters.subcategory
        : true;

      const matchPrice =
        p.price >= filters.minPrice && p.price <= filters.maxPrice;

      return matchSubcategory && matchPrice;
    });
  }, [products, filters]);

  // Group products by subcategory
  const grouped = useMemo(() => {
    return Array.from(
      filteredProducts.reduce((map, product) => {
        if (!map.has(product.subcategory)) map.set(product.subcategory, []);
        map.get(product.subcategory)!.push(product);
        return map;
      }, new Map<string, Product[]>())
    );
  }, [filteredProducts]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (products.length === 0)
    return <div className="text-center mt-10">No products found in {category} category</div>;

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteClick = async (product: Product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/api/admin/products/${product.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove from UI
      setProducts(prev => prev.filter(p => p.id !== product.id));

      toast.success("Product deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
  
      <ProductFilter key={category} products={products} onFilterChange={setFilters} />

      {grouped.map(([subcategory, items]) => (
        <div key={subcategory} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">{subcategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {items.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={isAdmin ? handleEditClick : undefined}
                onDelete={isAdmin ? handleDeleteClick : undefined}
              />
            ))}
          </div>
        </div>
      ))}
      {selectedProduct && (
        <ProductEditModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          productId={selectedProduct.id}
          onUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
};

export default ProductsByCategory;