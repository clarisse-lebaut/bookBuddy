const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const port = 3000;

mongoose.connect(`mongodb://localhost:27017/BookBuddy`);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to the database!"));

// Midlewares
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "my-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

// import roots
const booksRoute = require("./routes/booksRoute");
const usersRoute = require("./routes/usersRoute");
app.use(booksRoute, usersRoute);

const rewardsRoute = require("./routes/rewardsRoute");
app.use(rewardsRoute);

//start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
