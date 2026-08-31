import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";

const ShippingInfoPage: React.FC = () => {
  useScrollToTop();

  return (
    <div className="prose max-w-4xl mx-auto p-6">
      <h1 id="start" className="text-center font-bold">
        The Tech Hub - Shipping & Delivery
      </h1>
      <br />

      <p>
        The Tech Hub is committed to delivering your orders quickly, safely, and
        reliably. Below you can find all the information regarding our shipping
        and delivery process.
      </p>
      <br />

      <h2>1. Processing Time</h2>
      <p>
        Orders are typically processed within 1–2 business days. Orders placed
        on weekends or holidays will be processed on the next working day.
      </p>
      <div className="divider"></div>

      <h2>2. Delivery Time</h2>
      <p>
        Delivery times vary depending on your location. Estimated delivery is:
        <br />• 1–3 business days for major cities
        <br />• 3–5 business days for remote areas
      </p>
      <div className="divider"></div>

      <h2>3. Shipping Costs</h2>
      <p>
        Shipping costs are calculated at checkout based on your location and
        order size. Free shipping may be available for orders above a certain
        value.
      </p>
      <div className="divider"></div>

      <h2>4. Order Tracking</h2>
      <p>
        Once your order is shipped, you will receive a tracking number via email
        so you can monitor your delivery in real time.
      </p>
      <div className="divider"></div>

      <h2>5. Delivery Issues</h2>
      <p>
        If your order is delayed, lost, or arrives damaged, please contact us as
        soon as possible at:
        <a href="mailto:thetechhub@mail.gr"> thetechhub@mail.gr</a>
      </p>
      <div className="divider"></div>

      <h2>6. Incorrect Address</h2>
      <p>
        Customers are responsible for providing accurate shipping details. The
        Tech Hub is not responsible for delays or losses caused by incorrect
        addresses.
      </p>
    </div>
  );
};

export default ShippingInfoPage;