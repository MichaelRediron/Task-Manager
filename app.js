const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorhandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorhandlerMiddleware);

// connect to database and start server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
