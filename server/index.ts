import express from "express";
import {
  createBooking,
  createUser,
  getUserById,
} from "./controllers/user.controller";

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
  res
    .status(201)
    .json({ message: "I'm doing fine, thank you. (:", from: "server" });
});

app.get("/booking", createBooking);

app.get("/user/:userId", getUserById); // SignIn
app.post("/users", createUser);

app.listen(PORT, () => {
  console.log("Server is running");
});
