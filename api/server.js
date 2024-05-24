// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./rootsUser.js");

const app = express();
const port = 2024;

app.use(express.json());
app.use("/user", userRouter);

mongoose.connect(`mongodb://localhost:27017/BookBuddy`);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to the database!"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Exportation du serveur
module.exports = app;
