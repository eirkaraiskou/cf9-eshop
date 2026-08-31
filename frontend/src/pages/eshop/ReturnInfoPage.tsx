import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";

const ReturnInfoPage: React.FC = () => {
  useScrollToTop();

  return (
    <div className="prose max-w-4xl mx-auto p-6">
      <h1 className="text-center font-bold">
        The Tech Hub - Returns & Refunds
      </h1>
      <br />

      <p>
        At The Tech Hub, we strive to ensure customer satisfaction. If you are
        not completely happy with your purchase, you may request a return or
        refund under the conditions outlined below.
      </p>
      <br />

      <h2>1. Return Eligibility</h2>
      <p>
        Products can be returned within 14 days of delivery, provided they are
        unused, in their original condition, and in the original packaging with
        all accessories included.
      </p>
      <div className="divider"></div>

      <h2>2. Non-Returnable Items</h2>
      <p>
        Certain items may not be eligible for return, including:
        <br />• Opened or used products
        <br />• Digital/downloadable products
        <br />• Items marked as non-returnable
      </p>
      <div className="divider"></div>

      <h2>3. Refund Process</h2>
      <p>
        Once we receive and inspect your returned item, we will notify you of the
        approval or rejection of your refund. Approved refunds will be processed
        within a few business days to your original payment method.
      </p>
      <div className="divider"></div>

      <h2>4. Return Shipping</h2>
      <p>
        Customers are responsible for return shipping costs unless the product is
        defective or incorrect. In such cases, The Tech Hub will cover the return
        shipping fees.
      </p>
      <div className="divider"></div>

      <h2>5. Damaged or Defective Products</h2>
      <p>
        If you receive a damaged or defective item, please contact us immediately
        with photos and details at:
        <a href="mailto:thetechhub@mail.gr"> thetechhub@mail.gr</a>
      </p>
      <div className="divider"></div>

      <h2>6. Exchanges</h2>
      <p>
        Exchanges are only available for defective or damaged items. If you need
        to exchange a product, please contact us to arrange the process.
      </p>
      <div className="divider"></div>

      <h2>7. Late or Missing Refunds</h2>
      <p>
        If you haven’t received your refund yet, please check your bank account
        and contact your payment provider. If the issue persists, contact us for
        assistance.
      </p>
    </div>
  );
};

export default ReturnInfoPage;