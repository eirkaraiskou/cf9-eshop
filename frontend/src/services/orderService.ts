import axios from "axios";
import type { Cart } from "../types/cart";

const API_URL = "http://localhost:8080/api/orders";

/**
 * Sends checkout request to backend
 */
export const checkout = async (
  cart: Cart,
  shippingAddress: string,
  shippingMethod: string,
  paymentMethod: string
) => {

  //JWT token
  const token = localStorage.getItem("token");

  const payload = {
    items: cart.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal
    })),
    total: cart.total,
    shippingAddress,
    shippingMethod,
    paymentMethod
  };

  try {
    const response = await axios.post(
      `${API_URL}/checkout`,
      payload,
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {} // allow guest checkout
      }
    );

    return response.data;

  } catch (error) {
    console.error("Checkout API error:", error);
    throw error;
  }
};