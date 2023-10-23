import express from "express";
import getEvents from "../services/events/getEvents.js";
import getEventById from "../services/events/getEventById.js";
import createEvent from "../services/events/createEvent.js";
import deleteEvent from "../services/events/deleteEvent.js";
import updateEventById from "../services/events/updateEventById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
  const { title } = req.query;
  const events = await getEvents(title);
  res.status(200).json(events);
});

eventRouter.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;
    const newEvent = await createEvent(
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds
    );
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});

eventRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await getEventById(id);
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

eventRouter.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;
    const updatedEvent = await updateEventById(
      id,
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
});

eventRouter.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedEventId = await deleteEvent(id);
      res.status(200).json({
        message: `Event with id${deletedEventId} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default eventRouter;
