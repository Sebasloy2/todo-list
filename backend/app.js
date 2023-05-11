const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// Import routes
const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/list');
const userRoutes = require('./routes/user');

// Initialize the Express app
const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log(err);
  });

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/list', listRoutes);
app.use('/api/user', userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
