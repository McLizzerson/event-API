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
  try {
    const events = getEvents();
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while getting list of events!");
  }
});

eventRouter.post("/", authMiddleware, (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating a new event!");
  }
});

// Second '/:id' routes
eventRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const event = getEventById(id);

    if (!event) {
      res.status(404).send(`Event with id ${id} was not found!`);
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while getting event by Id!");
  }
});

eventRouter.put("/:id", authMiddleware, (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while updating event by Id!");
  }
});

eventRouter.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedEventId = deleteEvent(id);

    if (!deletedEventId) {
      res.status(404).send(`Event with id${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Event with id${deletedEventId} has been deleted`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while deleting a event!");
  }
});

export default eventRouter;
