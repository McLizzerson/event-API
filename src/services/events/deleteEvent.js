import eventData from "../../data/events.json" assert { type: "json" };

const deleteEvent = (id) => {
  const eventIndex = eventData.events.findIndex((event) => event.id === id);

  eventData.events.splice(eventIndex, 1);

  return id;
};

const example = deleteEvent(1);
console.log(example);

export default deleteEvent;
