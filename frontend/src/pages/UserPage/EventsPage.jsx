import React, { useEffect } from "react";
import Header from "../../components/Layout/Header/Header";
import EventCard from "../../components/Route/EventCard/EventCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllEventsUser } from "../../redux/actions/event.js";

function EventsPage() {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEventsUser());
  }, [dispatch]);

  const allEventData = event?.message || [];

  if (!allEventData.length) {
    return (
      <div>
        <Header activeHeading={4} />
        <div className="w-full text-center py-16">
          <h2 className="text-xl text-gray-700 font-semibold">
            🚫 No events available at the moment.
          </h2>
          <p className="text-gray-500 mt-2">Please check back later!</p>
        </div>
      </div>
    );
  }

  return (
  <div>
    <Header activeHeading={4} />
    <div className="space-y-8 px-4 mt-8 w-full max-w-[1300px] md:max-w-[1100px] mx-auto items-center"> {/* Adds vertical space between cards */}
      {allEventData.map((eventItem) => (
        <EventCard key={eventItem._id} event={eventItem} />
      ))}
    </div>
    <br />
    <br />
  </div>
);

}

export default EventsPage;
