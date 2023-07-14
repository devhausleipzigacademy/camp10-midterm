import express from "express";

import { getUserById, createUser } from "./controllers/controller";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  express.json({
    limit: "3mb",
  })
);
app.use((req, res, next) => {
  next();
});
app.get("/", (req, res, next) => {
  res.status(201).json({ message: "I'm an initial Post", from: "server" });
});

app.get("/user/:userId", getUserById);
app.post("/users", createUser);
app.post("/createBooking", createUser);

app.listen(PORT, () => {
  console.log("Server is running");
});
