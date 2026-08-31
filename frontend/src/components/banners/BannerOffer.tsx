import React, { useEffect, useState } from "react";

const BannerOffer: React.FC = () => {
  // Set offer end date 
  const offerEnd = new Date();
  offerEnd.setDate(offerEnd.getDate() + 4);

  const calculateTimeLeft = () => {
    const difference = offerEnd.getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div role="alert" className="alert alert-vertical sm:alert-horizontal bg-blue-600 text-white">

      <img src="Offer.png" />

      <div className="flex-1">
        <h3 className="font-bold text-lg md:text-xl">Limited Offer</h3>
        <div className="text-xs md:text-sm">Grab your favorite tech gadgets and enjoy free delivery on orders over 75€!</div>

        <div className="grid grid-flow-col gap-3 sm:gap-5 text-center auto-cols-max justify-center sm:justify-start mt-2">
          <div className="flex flex-col">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": timeLeft.days } as React.CSSProperties} aria-live="polite" aria-label="days">{timeLeft.days}</span>
            </span>
            days
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": timeLeft.hours } as React.CSSProperties} aria-live="polite" aria-label="hours">{timeLeft.hours}</span>
            </span>
            hours
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": timeLeft.minutes } as React.CSSProperties} aria-live="polite" aria-label="minutes">{timeLeft.minutes}</span>
            </span>
            min
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": timeLeft.seconds } as React.CSSProperties} aria-live="polite" aria-label="seconds">{timeLeft.seconds}</span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOffer;