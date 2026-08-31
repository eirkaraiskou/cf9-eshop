import axios from "axios";
import type { Cart } from "../types/cart";

const API_URL = "http://localhost:8080/api/cart";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

const getLocalCart = (): Cart => {
  const localCart = localStorage.getItem("cart");
  return localCart ? JSON.parse(localCart) : { items: [], total: 0 };
};

const saveLocalCart = (cart: Cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const recalcTotal = (cart: Cart) => {
  cart.total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
};

const notify = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCart = async (): Promise<Cart> => {
  const token = localStorage.getItem("token");

  if (token) {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  }

  // Guest mode
  return getLocalCart();
};

export const mergeGuestCart = async (): Promise<void> => {
  const localCart = localStorage.getItem("cart");
  const token = localStorage.getItem("token");

  if (!localCart || !token) return;

  const cart: Cart = JSON.parse(localCart);

  try {
    for (const item of cart.items) {
      await axios.post(
        `${API_URL}/${item.productId}?quantity=${item.quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    // Clear guest cart
    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Cart merge failed:", error);
  }
};

export const addItem = async (
  product: { id: number; name: string; price: number },
  quantity = 1
): Promise<void> => {
  const token = localStorage.getItem("token");

  if (token) {
    await axios.post(
      `${API_URL}/${product.id}?quantity=${quantity}`,
      {},
      { headers: getAuthHeader() }
    );
  } else {
    const cart = getLocalCart();

    const existing = cart.items.find(
      (i) => i.productId === product.id
    );

    if (existing) {
      existing.quantity += quantity;
      existing.subtotal = existing.price * existing.quantity;
    } else {
      cart.items.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        subtotal: product.price * quantity,
      });
    }

    recalcTotal(cart);
    saveLocalCart(cart);
  }

  notify();
};

export const updateQuantity = async (
  productId: number,
  quantity: number
): Promise<void> => {
  const token = localStorage.getItem("token");

  if (token) {
    await axios.put(
      `${API_URL}/${productId}?quantity=${quantity}`,
      {},
      { headers: getAuthHeader() }
    );
  } else {
    const cart = getLocalCart();

    const item = cart.items.find((i) => i.productId === productId);
    if (!item) return;

    item.quantity = quantity;
    item.subtotal = item.price * quantity;

    // Remove for zero quantity
    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    }

    recalcTotal(cart);
    saveLocalCart(cart);
  }

  notify();
};

// --------------------

export const removeItem = async (productId: number): Promise<void> => {
  const token = localStorage.getItem("token");

  if (token) {
    await axios.delete(`${API_URL}/${productId}`, {
      headers: getAuthHeader(),
    });
  } else {
    const cart = getLocalCart();

    cart.items = cart.items.filter(
      (i) => i.productId !== productId
    );

    recalcTotal(cart);
    saveLocalCart(cart);
  }

  notify();
};

export const clearCart = async (): Promise<void> => {
  const token = localStorage.getItem("token");

  if (token) {
    await axios.delete(API_URL, {
      headers: getAuthHeader(),
    });
  } else {
    saveLocalCart({ items: [], total: 0 });
  }

  notify();
};