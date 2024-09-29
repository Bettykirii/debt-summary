const express = require('express');
const uploadRoutes = require('./routes/uploads'); // Upload route

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload route
app.use('/upload', uploadRoutes);

// Export the app and server for testing purposes
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
