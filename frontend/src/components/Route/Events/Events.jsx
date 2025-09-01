import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import EventCard from "../EventCard/EventCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getAllEventsUser } from "../../../redux/actions/event.js";

function Events() {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEventsUser());
  }, [dispatch]);

  const firstEvent = event?.message?.[0] || null;

  return (
    <div>
      <div className={`${styles.section} py-8 mt-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Popular Events
            </h1>
            <p className="text-lg text-gray-600">
              Discover our most exciting upcoming events
            </p>
          </div>
          <div className="w-full">
            <EventCard event={firstEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
