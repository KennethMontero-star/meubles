require('dotenv').config(); // Load environment variables from .env file
const express = require('express');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Homepage route
app.get('/', (req, res) => {
  res.send('Homepage');
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3000; // Use the port from the environment variables or default to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
