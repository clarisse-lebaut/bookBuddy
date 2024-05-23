const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect(`mongodb://localhost:27017/BookBuddy`);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the database!'));

app.use(express.json());

const addUserRoute = require('./routes/addUser');
app.use('/api/addUser', addUserRoute);

const addBookRoute = require('./routes/addBook');
app.use('/api/addBook', addBookRoute);

const booksRoute = require('./routes/books');
app.use('/api/books', booksRoute);

const bookRoute = require('./routes/book');
app.use('/api/book', bookRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
