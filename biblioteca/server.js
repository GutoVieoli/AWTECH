const express = require('express');
const cors = require('cors');


const app = express();


app.use( cors() );
app.use(express.json());

const users = require('./src/router/user_router');
const books = require('./src/router/books_router');

app.use('/', users.router);
app.use('/books', books.router);


const PORT = 8000;

app.listen(PORT)

