import React, { useEffect, useState } from "react";

function CountDown({ data }) {
  // Make sure these are valid Date strings or timestamps
  const startDate = data?.start_Date;
  const endDate = data?.end_Date;

  // Use end date as target
  const targetDate = endDate ? new Date(endDate) : null;

  const calculateTimeLeft = () => {
    if (!targetDate) return null;

    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) return null; // expired

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]); // recalc if date changes

  if (!targetDate) {
    return <div className="text-gray-400">No end date provided</div>;
  }

  if (!timeLeft) {
    return (
      <div className="text-xl font-bold text-red-500 animate-pulse">
        Time's up! ⏳
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center items-center p-1">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center w-10">
          <span className="text-2xl font-bold text-blue-400">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-sm text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default CountDown;
