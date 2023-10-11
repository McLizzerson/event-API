import express from "express";
import getEvents from "../services/events/getEvents.js";
import getEventById from "../services/events/getEventById.js";
import createEvent from "../services/events/createEvent.js";
import deleteEvent from "../services/events/deleteEvent.js";
import updateEventById from "../services/events/updateEventById.js";
import authMiddleware from "../middleware/auth.js";

const eventRouter = express.Router();

// First '/' routes, main routes

eventRouter.get("/", (req, res) => {
  const { title } = req.query;
  const events = getEvents(title);
  res.status(200).json(events);
});

eventRouter.post("/", authMiddleware, (req, res) => {
  const {
    userId,
    title,
    description,
    imageUrl,
    categoryIds,
    location,
    startTime,
    endTime,
  } = req.body;
  const newEvent = createEvent(
    userId,
    title,
    description,
    imageUrl,
    categoryIds,
    location,
    startTime,
    endTime
  );
  res.status(201).json(newEvent);
});

// Second '/:id' routes
eventRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const event = getEventById(id);

  if (!event) {
    res.status(404).send(`Event with id ${id} was not found!`);
  } else {
    res.status(200).json(event);
  }
});

eventRouter.put("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const {
    userId,
    title,
    description,
    imageUrl,
    categoryIds,
    location,
    startTime,
    endTime,
  } = req.body;
  const updatedEvent = updateEventById(
    id,
    userId,
    title,
    description,
    imageUrl,
    categoryIds,
    location,
    startTime,
    endTime
  );
  res.status(200).json(updatedEvent);
});

eventRouter.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const deletedEventId = deleteEvent(id);

  if (!deletedEventId) {
    res.status(404).send(`Event with id${id} was not found!`);
  } else {
    res.status(200).json({
      message: `Event with id${deletedEventId} has been deleted`,
    });
  }
});

export default eventRouter;
