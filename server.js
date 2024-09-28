const express = require('express');
// const upload = require('./middlewares/fileUpload');  // Middleware for handling file uploads
const uploadRoutes = require('./routes/uploads');    // Upload route

const app = express();
const port = process.env.PORT || 3000;               // Use PORT from env, or default to 3000

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// File upload route
app.use('/upload', uploadRoutes);  // Just pass the upload route here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
