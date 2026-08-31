import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Cart } from "../../types/cart";
import { getCart, updateQuantity, removeItem as removeCartItem,} from "../../services/cartService";
import { AuthContext } from "../../auth/AuthContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = auth?.isLoggedIn ?? false;

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetches cart backend (logged) or localstorage (quest)
  const fetchCart = useCallback(async () => {
    setLoading(true);

    try {
      if (isLoggedIn) {
        const data = await getCart();
        setCart(data);
      } else {
        const localCart = localStorage.getItem("cart");
        setCart(localCart ? JSON.parse(localCart) : { items: [], total: 0 });
      }
    } catch (error) {
      console.error("Cart error:", error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  /**
   * Load cart when drawer opens
   */
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, fetchCart]);

  /**
   * Increase product quantity
   */
  const increaseQty = async (productId: number, currentQty: number) => {
    //if (!isLoggedIn) return;

    await updateQuantity(productId, currentQty + 1);
    await fetchCart();
  };

  // Updates cart if drawer is open 
  useEffect(() => {
    const handleCartUpdate = () => {
      if (isOpen) {
        fetchCart();
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [isOpen, fetchCart]);

  /**
   * Decrease product quantity
   * Removes item if quantity reaches 0
   */
  const decreaseQty = async (productId: number, currentQty: number) => {
    //if (!isLoggedIn) return;

    const newQty = currentQty - 1;

    if (newQty <= 0) {
      await removeCartItem(productId);
    } else {
      await updateQuantity(productId, newQty);
    }

    await fetchCart();
  };

  /**
   * Remove product from cart
   */
  const handleRemove = async (productId: number) => {
    //if (!isLoggedIn) return;

    await removeCartItem(productId);
    await fetchCart();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-base-100 shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {loading && <p>Loading...</p>}

        {!loading && cart && cart.items.length === 0 && (
          <p>Your cart is empty.</p>
        )}

        {!loading && cart && cart.items.length > 0 && (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center border-b pb-2">
                <div>
                  
                  <p className="font-semibold cursor-pointer hover:underline" onClick={() => { 
                    navigate(`/product/${item.productId}`);
                    onClose(); }}>
                    {item.productName}
                </p>
                  <p className="text-sm text-gray-500">
                    €{item.price} x {item.quantity}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <p className="font-semibold">€{item.subtotal.toFixed(2)}</p>

                  <div className="flex items-center gap-2">
                    <button className="btn btn-xs" onClick={() =>decreaseQty(item.productId, item.quantity)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button className="btn btn-xs" onClick={() => increaseQty(item.productId, item.quantity)}>
                      +
                    </button>
                  </div>

                  <button className="text-red-400 text-xs cursor-pointer hover:underline transition" onClick={() => handleRemove(item.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {cart && cart.items.length > 0 && (
          <div className="mb-3 flex justify-between font-bold">
            <span>Total</span>
            <span>€{cart.total}</span>
          </div>
        )}

        <button className="btn btn-primary w-full"
          disabled={!cart || cart.items.length === 0}
          onClick={() => { onClose(); navigate("/checkout"); }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;