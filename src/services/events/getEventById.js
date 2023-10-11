import eventData from "../../data/events.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

// Convert event.id to number? Think about what to convert to what.

const getEventById = (id) => {
  const event = eventData.events.find(
    (event) => String(event.id) === String(id)
  );

  if (!event) {
    throw new NotFoundError("Event", id);
  }
  return event;
};

export default getEventById;
