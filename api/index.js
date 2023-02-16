const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const orderRoute = require('./routes/order');
dotenv.config();

// connect to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => console.log('Connected to DB!'));

// Middleware
app.use(express.json());

// route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/add-order', orderRoute);

app.listen(3004, () => console.log('Server up and running!'));