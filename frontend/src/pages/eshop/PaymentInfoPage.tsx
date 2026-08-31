import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";

const PaymentInfoPage: React.FC = () => {
  useScrollToTop();

  return (
    <div className="prose max-w-4xl mx-auto p-6">
      <h1 className="text-center font-bold">
        The Tech Hub - Payment Methods
      </h1>
      <br />

      <p>
        The Tech Hub offers multiple secure and convenient payment methods to
        ensure a smooth shopping experience for all customers.
      </p>
      <br />

      <h2>1. Credit & Debit Cards</h2>
      <p>
        We accept major credit and debit cards including Visa, Mastercard, and
        other supported providers. All transactions are processed securely
        through trusted payment gateways.
      </p>
      <div className="divider"></div>

      <h2>2. Interest-Free Installments</h2>
      <p>
        Customers can choose to pay in up to 48 interest-free installments,
        depending on their bank and card provider. This option allows you to
        spread the cost of your purchase with no additional fees.
      </p>
      <div className="divider"></div>

      <h2>3. Cash on Delivery (COD)</h2>
      <p>
        You may choose to pay for your order upon delivery. Please note that
        additional fees may apply depending on your location and order value.
      </p>
      <div className="divider"></div>

      <h2>4. Bank Transfer</h2>
      <p>
        Orders can also be paid via bank transfer. Your order will be processed
        once the payment has been confirmed. Please include your order number
        in the transfer details.
      </p>
      <div className="divider"></div>

      <h2>5. Payment Security</h2>
      <p>
        All payments are processed using secure encryption technologies. The Tech
        Hub does not store your card details and works with trusted providers to
        ensure your data is protected.
      </p>
    </div>
  );
};

export default PaymentInfoPage;