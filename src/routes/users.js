import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import deleteUser from "../services/users/deleteUser.js";
import updateUserById from "../services/users/updateUserById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  const { name } = req.query;
  const users = getUsers(name);
  res.status(200).json(users);
});

userRouter.post("/", authMiddleware, (req, res) => {
  const { username, password, name, image } = req.body;
  const newUser = createUser(username, password, name, image);
  res.status(201).json(newUser);
});

userRouter.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);
    res.status(200).json(user);
  },
  notFoundErrorHandler
);

userRouter.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { username, password, name, image } = req.body;
    const updatedUser = updateUserById(id, username, password, name, image);
    res
      .status(200)
      .json({ message: `User with id ${id} has been updated succesfully` });
  },
  notFoundErrorHandler
);

userRouter.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedUserId = deleteUser(id);
    res.status(200).json({
      message: `User with id${deletedUserId} has been deleted`,
    });
  },
  notFoundErrorHandler
);

export default userRouter;
