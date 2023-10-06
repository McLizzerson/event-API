import eventData from "../../data/events.json" assert { type: "json" };

// Convert event.id to number? Think about what to convert to what.

const getEventById = (id) => {
  const event = eventData.events.find((event) => Number(event.id) === id);
  return event;
};

export default getEventById;
