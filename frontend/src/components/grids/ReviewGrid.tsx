import React, { useState } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

const allReviews: Review[] = [
  { id: 1, name: "Alice Johnson", rating: 5, comment: "Excellent service!", avatar: "https://i.pravatar.cc/100?img=32" },
  { id: 2, name: "Michael Smith", rating: 4, comment: "Good quality products.", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 3, name: "Sophie Lee", rating: 5, comment: "Amazing experience!", avatar: "https://i.pravatar.cc/100?img=44" },
  { id: 4, name: "Daniel Kim", rating: 3, comment: "Delivery took a bit long.", avatar: "https://i.pravatar.cc/100?img=56" },
  { id: 5, name: "Emily Davis", rating: 5, comment: "Highly recommend!", avatar: "https://i.pravatar.cc/100?img=21" },
  { id: 6, name: "James Wilson", rating: 4, comment: "Very satisfied with the product.", avatar: "https://i.pravatar.cc/100?img=67" },
  { id: 7, name: "Olivia Brown", rating: 5, comment: "Fantastic support team.", avatar: "https://i.pravatar.cc/100?img=22" },
  { id: 8, name: "Ethan Clark", rating: 4, comment: "Products are as described.", avatar: "https://i.pravatar.cc/100?img=44" },
  { id: 9, name: "Mia Thompson", rating: 5, comment: "Will buy again!", avatar: "https://i.pravatar.cc/100?img=5" },
];

function getRandomReviews(arr: Review[], count: number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]; // shuffle
  }
  return copy.slice(0, count);
}

const ReviewGrid: React.FC = () => {
  // Random selection initialized once
  const [reviews] = useState<Review[]>(() => getRandomReviews(allReviews, 3));

  return (
    <section className="my-10 max-w-7xl mx-auto px-4">

      <div className="grid gap-6 lg:gap-24 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="card bg-base-100 shadow-md rounded-lg p-6 flex flex-col justify-between border border-transparent hover:border-primary transition-transform transform hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Reviewer Info */}
            <div className="flex items-center mb-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <div className="font-semibold text-gray-800">{review.name}</div>
                <div className="flex mt-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 ${index < review.rating ? "opacity-100" : "opacity-40"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comment */}
            <p className="text-gray-700 mt-2 flex-1">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewGrid;