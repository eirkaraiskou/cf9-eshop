import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Cart } from "../../types/cart";
import { getCart } from "../../services/cartService";
import { checkout } from "../../services/orderService";


type Step = "FORM" | "SUCCESS";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);

  const [addressError, setAddressError] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Speedex");

  const [step, setStep] = useState<Step>("FORM");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [showModal, setShowModal] = useState(false);

  const [orderId, setOrderId] = useState<string | null>(null);


  const handlePlaceOrder = async () => {
    if (!cart) return;

    if (!shippingAddress.trim()) {
      setAddressError(true);

      setTimeout(() => {
        setAddressError(false);
      }, 2000);

      return;
    }

    try {
      setShowModal(true);

      const response = await checkout(
        cart,
        shippingAddress,
        shippingMethod,
        paymentMethod
      );
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      // Order id displayed is combination of real and a generated one
      const orderId = response.id;
      const realOrderId = orderId + "-" + Math.random().toString(16).substring(2, 10).toUpperCase();
      setOrderId(realOrderId);

      // Timing is used for animation
      setTimeout(() => {
        setShowModal(false);
        setStep("SUCCESS");
      }, 4000);

    } catch (error) {
      console.error("Checkout failed", error);
      setShowModal(false);
      alert("Checkout failed");
    }
  };

  useEffect(() => {
    if (!loading && cart && cart.items.length === 0) {
      navigate("/");
    }
  }, [cart, loading, navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">

      {/* Payment animation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center animate-fade-in">
            <img src="/illustrations/payment.gif" alt="Processing Payment . . ." className="w-lg object-contain mb-4 hidden sm:block" />
            <h2 className="block sm:hidden font-semibold">Processing Payment . .  .</h2>
          </div>
        </div>
      )}

      {/* Order completion message */}
      {step === "SUCCESS" && (
        <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in text-center">
          <img className="w-32 mb-2" src="icons/check.png"/>
          <p className="text-sm text-gray-500 mb-2">
            Order ID: <span className="font-semibold text-black">{orderId}</span>
          </p>
          <h2 className="text-xl font-bold mb-2">Order Completed!</h2>
          <p className="text-gray-500 mb-6">
            Your order is now being prepared.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Explore more
          </button>
        </div>
      )}

      {/* Form */}
      {step === "FORM" && (
        <>
          {/* Page Title */}
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Side */}
            <div className="bg-base-100 shadow-md p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Your Items</h2>
                {loading && <p>Loading...</p>}

                {!loading && cart && cart.items.length === 0 && (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                )}

                {!loading && cart && cart.items.length > 0 && (
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.productId} className="flex justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">
                            €{item.price} x {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          €{item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="flex justify-between font-bold pt-2">
                      <span>Total</span>
                      <span>€{cart.total}</span>
                    </div>
                  </div>
                )}
            </div>

            {/* Right Side */}
            <div className="bg-base-100 shadow-md p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full transition-all ${
                    addressError ? "border-red-500 placeholder-red-400" : ""
                  }`}
                  placeholder={addressError ? "Shipping address is required" : "Enter your address"}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              {/* Shipping */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Shipping Method
                </label>
                <select
                  className="select select-bordered w-full"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}>
                  <option value="ELTA">ELTA Courier</option>
                  <option value="SPEEDEX">Speedex</option>
                  <option value="BOXNOW">Box Now</option>
                </select>
              </div>

              {/* Payment */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  <label className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all hover:border-primary hover:shadow-md ${
                    paymentMethod === "CARD" ? "border-primary shadow-md" : "border-gray-300"
                  }`}>
                    <input type="radio" name="payment" className="hidden" value="CARD" checked={paymentMethod === "CARD"} onChange={() => setPaymentMethod("CARD")} />
                    <img src="/payments/Card.png" alt="Card" className="w-48 object-contain" />
                    <span className="text-sm font-medium text-center">Card</span>
                  </label>

                  <label className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all hover:border-primary hover:shadow-md ${
                    paymentMethod === "PAYPAL" ? "border-primary shadow-md" : "border-gray-300"
                  }`}>
                    <input type="radio" name="payment" className="hidden" value="PAYPAL" checked={paymentMethod === "PAYPAL"} onChange={() => setPaymentMethod("PAYPAL")} />
                    <img src="/payments/paypal.png" alt="PayPal" className="w-48 object-contain" />
                    <span className="text-sm font-medium text-center">PayPal</span>
                  </label>

                  <label className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all hover:border-primary hover:shadow-md ${
                    paymentMethod === "APPLE_PAY" ? "border-primary shadow-md" : "border-gray-300"
                  }`}>
                    <input type="radio" name="payment" className="hidden" value="APPLE_PAY" checked={paymentMethod === "APPLE_PAY"} onChange={() => setPaymentMethod("APPLE_PAY")} />
                    <img src="/payments/ApplePay.png" alt="Apple Pay" className="w-48 object-contain" />
                    <span className="text-sm font-medium text-center">Apple Pay</span>
                  </label>

                  <label className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all hover:border-primary hover:shadow-md ${
                    paymentMethod === "GOOGLE_PAY" ? "border-primary shadow-md" : "border-gray-300"
                  }`}>
                    <input type="radio" name="payment" className="hidden" value="GOOGLE_PAY" checked={paymentMethod === "GOOGLE_PAY"} onChange={() => setPaymentMethod("GOOGLE_PAY")} />
                    <img src="/payments/GooglePay.png" alt="Google Pay" className="w-48 object-contain" />
                    <span className="text-sm font-medium text-center">Google Pay</span>
                  </label>

                </div>
              </div>

              {/* Button */}
              <button className="btn btn-primary w-full" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;