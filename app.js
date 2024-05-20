require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//Mongo Database connection
const dbConnection = process.env.dbConnection;
mongoose
  .connect(dbConnection)
  .then(()=> console.log('Connected to MongoDB'))
  .catch(()=>console.error('Failed to connect to MongoDB'));

//routes
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);


// Start the server
const port = process.env.PORT || 3000; // Use the port from the environment variables or default to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
