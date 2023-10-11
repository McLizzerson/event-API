import eventData from "../../data/events.json" assert { type: "json" };
import NotFoundError from "../../errors/notFoundError.js";

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
  const event = eventData.events.find(
    (event) => String(event.id) === String(id)
  );

  if (!event) {
    throw new NotFoundError("Event", id);
  }
  event.createdBy = userId ?? event.createdBy;
  event.title = title ?? event.title;
  event.description = description ?? event.description;
  event.image = image ?? event.image;
  event.categoryIds = categoryIds ?? event.categoryIds;
  event.location = location ?? event.location;
  event.startTime = startTime ?? event.startTime;
  event.endTime = endTime ?? event.endTime;

  return event;
};

export default updateEventById;
