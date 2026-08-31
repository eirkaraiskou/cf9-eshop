import React, { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  items: OrderItem[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACCEPTED":
      return "badge badge-primary"; // blue
    case "PREPARING":
      return "badge badge-warning"; // yellow
    case "SHIPPED":
      return "badge badge-info"; // cyan
    case "DELIVERED":
      return "badge badge-success"; // green
    case "CANCELLED":
      return "badge badge-error"; // red
    case "FAILED":
      return "badge badge-neutral"; // gray
    default:
      return "badge";
  }
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/api/orders/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (id: number) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">You have no orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="card bg-base-100 shadow-md border border-gray-200"
          >
            {/* HEADER */}
            <div
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer hover:bg-gray-50 transition"
              onClick={() => toggleOrder(order.id)}
            >
              <div>
                <p className="font-semibold">
                  Order #{order.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className={getStatusBadge(order.status)}>
                    {order.status}
                </span>
                <span className="font-bold">€{order.total}</span>
              </div>
            </div>

            {/* DETAILS */}
            {openOrderId === order.id && (
              <div className="border-t p-4 animate-fade-in">
                
                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.productName} × {item.quantity}
                      </span>
                      <span>€{item.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="divider my-2"></div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-semibold">Shipping</p>
                    <p className="text-gray-500">
                      {order.shippingAddress}
                    </p>
                    <p className="text-gray-500">
                      {order.shippingMethod}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Payment</p>
                    <p className="text-gray-500">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>€{order.total}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;