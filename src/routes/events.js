import express from "express";
import getEvents from "../services/events/getEvents.js";
import getEventById from "../services/events/getEventById.js";
import createEvent from "../services/events/createEvent.js";
import deleteEvent from "../services/events/deleteEvent.js";
import updateEventById from "../services/events/updateEventById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const eventRouter = express.Router();

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

eventRouter.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const event = getEventById(id);
    res.status(200).json(event);
  },
  notFoundErrorHandler
);

eventRouter.put(
  "/:id",
  authMiddleware,
  (req, res) => {
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
  },
  notFoundErrorHandler
);

eventRouter.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedEventId = deleteEvent(id);
    res.status(200).json({
      message: `Event with id${deletedEventId} has been deleted`,
    });
  },
  notFoundErrorHandler
);

export default eventRouter;
