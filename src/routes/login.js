import express from "express";
import userData from "../data/users.json" assert { type: "json" };
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY;
  const { username, password } = req.body;
  const user = userData.users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Succesfully logged in!", token });
});

export default loginRouter;
