const express = require('express');
const mongoose = require('mongoose');

const booksRoute = require('./routes/books');

const app = express();
const port = 3000;

mongoose.connect(`mongodb://localhost:27017/BookBuddy`);

app.use(express.json());

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the database!'));

app.use('/api/books', booksRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
