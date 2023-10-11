import eventData from "../../data/events.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

const deleteEvent = (id) => {
  const eventIndex = eventData.events.findIndex(
    (event) => String(event.id) === String(id)
  );

  if (eventIndex === -1) {
    throw new NotFoundError("Event", id);
  }

  eventData.events.splice(eventIndex, 1);

  return id;
};

export default deleteEvent;
