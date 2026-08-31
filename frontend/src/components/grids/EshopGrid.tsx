import React from "react";

interface CardItem {
  label: string;
  description: string;
  imgSrc: string;
}

const cardItems: CardItem[] = [
  { 
    label: "Free Shipping",
    description: "On orders over €150.",
    imgSrc: "/icons/delivery.png",
  },
  { 
    label: "Secure Payments",
    description: "Pay safely with trusted methods.",
    imgSrc: "/icons/payment.png",
  },
  { 
    label: "Flexible Installments",
    description: "Up to 48 interest-free installments.",
    imgSrc: "/icons/installment.png",
  },
  { 
    label: "30-Day Free Returns",
    description: "Hassle-free returns within 30 days.",
    imgSrc: "/icons/return.png",
  },
];

const EshopGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
        {cardItems.map((item) => (
          <div key={item.label} className="bg-base-100 w-full max-w-sm shadow-sm">
            <div className="card-body items-center text-center">
              <div className="join w-full justify-center">
                <div className="join-item px-3 py-2 text-sm font-medium">
                    <img 
                        src={item.imgSrc} 
                        className="w-12 h-12 mb-3 mx-auto" 
                    />
                    <span>{item.label} <br /></span>
                    <span className="italic">{item.description}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EshopGrid;