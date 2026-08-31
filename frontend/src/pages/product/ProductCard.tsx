import React from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addItem } from "../../services/cartService";
import { useWishlist } from '../../hooks/useWishlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  available: boolean;
  quantity: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await addItem(product, 1);

      console.log(`Added product ${product.name} to cart`);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Add to cart failed:", error);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Deleted product ${product.name} | ID: ${product.id}`);
    if (onDelete) onDelete(product);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Edit product ${product.name} | ID: ${product.id}`);
    if (onEdit) onEdit(product);
  };

  const getProductImagePath = (imageUrl?: string) => {
    const fallback = '/no_image.png';
    if (!imageUrl) return fallback;
    return imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
  };

  return (
    <div
      className="card card-compact bg-base-100 shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[20rem] cursor-pointer hover:shadow-2xl transition-shadow relative"
      onClick={handleCardClick}
    >
      <figure>
        <img
          src={getProductImagePath(product.imageUrl)}
          alt={product.name}
          className="object-contain h-64 w-full"
          onError={(e) => { (e.target as HTMLImageElement).src = '/no_image.png'; }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="font-bold text-lg">{product.price.toFixed(2)} €</p>
        <p className={product.available ? 'text-green-600' : 'text-red-600'}>
          {product.available ? `In stock (${product.quantity})` : 'Out of stock'}
        </p>

        <div className="absolute flex gap-2 m-2 bottom-2 right-2">
          {/* All users */}
          {!isLoggedIn && (
            <button
              className={`btn btn-sm btn-primary flex items-center gap-1 ${!product.available ? 'btn-disabled' : ''}`}
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          )}

          {/* User role: User */}
          {isLoggedIn && !isAdmin && (
            <>
              <button
                className={`btn btn-sm btn-primary flex items-center gap-1 ${!product.available ? 'btn-disabled' : ''}`}
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </button>

              <button
                className={`btn btn-sm flex items-center gap-1 ${inWishlist ? 'btn-secondary' : 'btn-outline btn-secondary'}`}
                onClick={handleWishlistClick}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </>
          )}

          {/* User Role: Admin */}
          {isLoggedIn && isAdmin && (
            <>
              <button className="btn btn-sm btn-warning flex items-center gap-1" onClick={handleEdit}>
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button className="btn btn-sm btn-error flex items-center gap-1" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;