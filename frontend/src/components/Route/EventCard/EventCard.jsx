import React from "react";
import { Macbbok } from "../../../assets/data/dummyData";
import CountDown from "../../CountDown/CountDown.jsx";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  if (!event) return null;

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden w-full transition-shadow duration-300 shadow-md hover:shadow-lg">
      {/* IMAGE */}
      <div className="lg:w-[55%] p-4 lg:p-6 flex items-center justify-center">
        <Link
          to={`/products/${event?.name
            ?.toLowerCase()
            ?.split(" ")
            ?.join("-")}?isEvent=true`}
        >
          <img
            src={event?.images?.[0]?.url || Macbbok.image}
            alt={event?.name || "Product"}
            className="w-full h-auto max-h-[350px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* DETAILS */}
      <div className="lg:w-[45%] p-4 lg:p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {event?.name ||
              "MacBook Pro M2 Chipset 256GB SSD 8GB RAM Space Gray"}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            {event?.description ||
              "Experience the power of the MacBook Pro with M2 chipset, perfect for professionals and creatives alike."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* PRICE */}
          <div className="flex items-baseline gap-3">
            <h5 className="text-xl font-bold text-blue-600">
              ${event?.discountedPrice || "999"}
            </h5>
            <h5 className="text-lg text-red-400 line-through">
              ${event?.originalPrice || "1099.95"}
            </h5>
          </div>

          {/* STATUS + COUNTDOWN + LINK */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full w-max">
              {event?.sold_out || 0} Sold Out
            </span>

            <div className="flex justify-center sm:justify-start">
              <CountDown data={event} />
            </div>

            <Link
              to={`/products/${event?.name
                ?.toLowerCase()
                ?.split(" ")
                ?.join("-")}?isEvent=true`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
