import eventData from "../../data/events.json" assert { type: "json" };

const updateEventById = (
  id,
  userId,
  title,
  description,
  image,
  categoryIds,
  location,
  startTime,
  endTime
) => {
  const event = eventData.events.find((event) => event.id === String(id));
  console.log(event);

  event.createdBy = String(userId) ?? event.createdBy;
  event.title = title ?? event.title;
  event.description = description ?? event.description;
  event.image = image ?? event.image;
  event.categoryIds = categoryIds ?? event.categoryIds;
  event.location = location ?? event.location;
  event.startTime = startTime ?? event.startTime;
  event.endTime = endTime ?? event.endTime;

  return event;
};

const example = updateEventById(1, "2");
console.log(example);

export default updateEventById;
