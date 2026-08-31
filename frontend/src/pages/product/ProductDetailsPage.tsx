import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { addItem } from "../../services/cartService";
import { useWishlist } from '../../context/WishlistContext';
import ProductEditModal from "../../components/modals/ProductEdit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleChevronLeft, faHeart, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number;
  name: string;
  description: string;
  specifications: string; // JSON
  price: number;
  imageUrl: string;
  category: string;
  subcategory: string;
  available: boolean;
  quantity: number;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
      } catch {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  // Parse specifications JSON
  let specs: { key: string; value: string }[] = [];
  try {
    specs = product.specifications
      ? Object.entries(JSON.parse(product.specifications)).map(([key, value]) => ({ key, value: String(value) }))
      : [];
  } catch (e) {
    console.error('Failed to parse specifications', e);
  }

  // User actions
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addItem(
        {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        1
      );

      window.dispatchEvent(new Event("cartUpdated"));

      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add product to cart");
    }
  };

  const handleWishlistClick = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  // Admin actions
  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProduct(updatedProduct);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/api/admin/products/${product.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Product deleted");
      navigate("/productManagement");

    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="container mx-auto p-1 sm:p-4 md:p-6">
      <div className="card bg-base-100 shadow-xl flex flex-col lg:flex-row gap-6 p-6">
        {/* Product Image */}
        <figure className="lg:w-1/2 flex justify-center items-center">
          <img
            src={product.imageUrl.startsWith('/') ? product.imageUrl : '/' + product.imageUrl}
            alt={product.name}
            className="object-contain max-h-96"
            onError={(e) => { (e.target as HTMLImageElement).src = '/no_image.png'; }}
          />
        </figure>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold">{product.price.toFixed(2)} €</p>
          <p className={product.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
            {product.available ? `In stock (${product.quantity})` : 'Out of stock'}
          </p>

          {/* Specifications Table */}
          {specs.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-4 mb-2">Specifications</h2>
              <div className="overflow-x-auto">
                <table className="table table-compact table-zebra w-full border shadow-md rounded-lg">
                  <tbody>
                    {specs.map((spec, index) => (
                      <tr key={index}>
                        <td className="font-semibold">{spec.key}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Action Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
  
            <button className="btn btn-outline w-full sm:w-auto" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faCircleChevronLeft} /> Back
            </button>

          {!isLoggedIn && (
                <button
                  className={`btn btn-primary w-full sm:w-auto ${!product.available ? 'btn-disabled' : ''}`}
                  onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>
            )}

            {isLoggedIn && !isAdmin && (
              <>
                <button
                  className={`btn btn-primary w-full sm:w-auto ${!product.available ? 'btn-disabled' : ''}`}
                  onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>
                <button
                  className={`btn w-full sm:w-auto flex items-center gap-2 ${ isInWishlist(product.id) ? 'btn-secondary' : 'btn-outline btn-secondary'}`} onClick={handleWishlistClick}>
                  <FontAwesomeIcon icon={faHeart} />
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </>
            )}

            {isLoggedIn && isAdmin && (
              <>
                <button className="btn btn-error w-full sm:w-auto" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrashCan} /> Delete
                </button>
                <button className="btn btn-warning w-full sm:w-auto" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPencil} /> Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {product && (
        <ProductEditModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          productId={product.id}
          onUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;