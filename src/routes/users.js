import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import deleteUser from "../services/users/deleteUser.js";
import updateUserById from "../services/users/updateUserById.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// First '/' routes, main routes
userRouter.get("/", (req, res) => {
  try {
    const users = getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while getting list of users!");
  }
});

userRouter.post("/", authMiddleware, (req, res) => {
  try {
    const { username, password, name, image } = req.body;
    const newUser = createUser(username, password, name, image);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating a new user!");
  }
});

// Second '/:id' routes
userRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      res.status(404).send(`User with id ${id} was not found!`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while getting user by Id!");
  }
});

userRouter.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, image } = req.body;
    const updatedUser = updateUserById(id, username, password, name, image);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while updating user by Id!");
  }
});

userRouter.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserId = deleteUser(id);

    if (!deletedUserId) {
      res.status(404).send(`User with id${id} was not found!`);
    } else {
      res.status(200).json({
        message: `User with id${deletedUserId} has been deleted`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while deleting a user!");
  }
});

export default userRouter;
