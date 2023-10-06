import eventData from "../../data/events.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

// check check double check with these parameters!!
const createEvent = (
  userId,
  title,
  description,
  imageUrl,
  categoryIds,
  location,
  startTime,
  endTime
) => {
  const newEvent = {
    id: uuid(),
    createdBy: userId,
    title: title,
    description: description,
    image: imageUrl,
    categoryIds: categoryIds,
    location: location,
    startTime: startTime,
    endTime: endTime,
  };

  //   does this really work or is this for show?
  eventData.events.push(newEvent);
  return newEvent;
};

// example for testing
const example = createEvent(
  1,
  "relaxing",
  "chill",
  "url",
  1,
  "home",
  "10pm",
  "11pm"
);
console.log(example);

export default createEvent;
