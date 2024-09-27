const express = require('express');
const fileUpload = require('./middlewares/fileUpload');  // Middleware for handling file uploads
const uploadRoutes = require('./routes/uploads');         // Upload route

const app = express();
const port = process.env.PORT || 3000;                   // Use PORT from env, or default to 3000

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling file uploads
 app.use(fileUpload()); // Make sure fileUpload is configured to handle file uploads

// File upload route
app.use('/upload', uploadRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Server is running smoothly!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
