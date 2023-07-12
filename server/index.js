const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const signUpUser_Router = require("./routes/signUpUser");
const signInUser_Router = require("./routes/signInUser");
const createBooking_Router = require("./routes/createBooking");

app.listen(PORT, () => {
  console.log(`Server started correctly on Port ${PORT}`);
});

app.use("/signupuser", signUpUser_Router);
app.use("/signInUser", signInUser_Router);
app.use("/createBooking", createBooking_Router);
