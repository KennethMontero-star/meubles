require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Mongo Database connection
const dbConnection = process.env.dbConnection;
mongoose
  .connect(dbConnection)
  .then(()=> console.log('Connected to MongoDB'))
  .catch(()=>console.error('Failed to connect to MongoDB'));

const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');

app.use('/api',customerRoutes);
app.use('/api/admin',adminRoutes)

// Serve the index.html file on the root route
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.use('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.use('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});


// Start the server
const port = process.env.PORT || 3000; // Use the port from the environment variables or default to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
