import { useEffect, useState } from "react";
import { faCalendarDays, faCaretLeft, faCaretRight, faCoins, faHashtag, faUser,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  id: number;
  username: string | null;
  status: string;
  total: number;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  createdAt: string;
  items: OrderItem[];
}

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetch("http://localhost:8080/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    };
    loadOrders();
  }, [token]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const updateStatus = async (orderId: number, status: string) => {
    await fetch(
      `http://localhost:8080/api/admin/orders/${orderId}/status?status=${status}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const statuses = ["ACCEPTED", "SHIPPED", "DELIVERED", "CANCELLED"];

  // Status badge color
  const statusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-300 text-white";
      case "CANCELLED":
        return "bg-red-300 text-white";
      case "SHIPPED":
        return "bg-blue-300 text-white";
      case "ACCEPTED":
        return "bg-cyan-300 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="p-4 md:p-8 lg:mx-32">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      {/* Orders */}
      <div className="flex flex-col gap-4">
        {paginatedOrders.map((order) => (
          <div key={order.id} className="collapse collapse-arrow border border-base-300 rounded-box transition-all duration-200 hover:shadow-md hover:border-blue-200">
            {/* Toggle checkbox */}
            <input type="checkbox" />

            {/* HEADER */}
            <div className="collapse-title flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-gray-600 font-semibold cursor-pointer">
              
              {/* ORDER INFO */}
              <div className="flex flex-col md:flex-row md:items-center text-sm md:text-base gap-2 md:gap-4">
            
                <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faHashtag} />{order.id}
                </span>
                 <div className="divider divider-horizontal h-6 hidden md:block"></div>

                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {new Date(order.createdAt).toLocaleString()}
                </span>
                 <div className="divider divider-horizontal h-6 hidden md:block"></div>

                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} />
                  {order.username || "Guest"}
                </span>
                 <div className="divider divider-horizontal h-6 hidden md:block"></div>

                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCoins} />
                  {order.total.toFixed(2)} €
                </span>
              </div>

              {/* STATUS BADGE */}
              <span className={`px-2 py-1 rounded text-xs md:text-sm ${statusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* CONTENT */}
            <div className="collapse-content bg-gray-50 border-t border-base-300 text-sm overflow-visible relative">
              <div className="p-3 md:p-4 space-y-3">
                {/* Status dropdown */}
                <div className="inline-block">
                    <select
                        className="select select-xs border border-base-300 bg-base-100"
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()} // prevent collapse toggle
                    >
                        {statuses.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                        ))}
                    </select>
                </div>
                
                {/* Items */}
                <div>
                  <strong>Items:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {order.items.map((item) => (
                      <li key={item.productId}>
                        {item.productName} — {item.quantity} × {item.price.toFixed(2)} € ={" "}
                        {item.subtotal.toFixed(2)} €
                      </li>
                    ))}
                  </ul>
                </div>

                <p>
                  <strong>Shipping:</strong> {order.shippingAddress} (
                  {order.shippingMethod})
                </p>

                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="btn btn-sm"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>

        <span className="text-sm md:text-base">
          Page {currentPage + 1} of {totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={currentPage + 1 >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};

export default OrderManagementPage;