import eventData from "../../data/events.json" assert { type: "json" };

const deleteEvent = (id) => {
  const eventIndex = eventData.events.findIndex(
    (event) => String(event.id) === String(id)
  );

  if (eventIndex === -1) {
    throw new Error(`Category with id ${id} was not found!`);
  }

  eventData.events.splice(eventIndex, 1);

  return id;
};

export default deleteEvent;
