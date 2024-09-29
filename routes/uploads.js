const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');  // CSV parsing library
const { upload, handleFileUploadError }= require('../middlewares/fileUpload'); // Make sure multer middleware is imported
const router = express.Router();

// Use multer middleware to handle file uploads
router.post('/', upload.single('file'), handleFileUploadError, (req, res) => {
  if (req.file) {
    console.log('Uploaded file:', req.file);  // Log file information

    const filePath = req.file.path;  // Get the path of the uploaded file

    // Object to accumulate total amounts owed by each pair
    const totalOwed = {};

    // Read the CSV file and log the data
    fs.createReadStream(filePath)
      .pipe(csv())  // Parse CSV file
      .on('data', (row) => {
        const debtor = row[Object.keys(row)[0]];  // First column (debtor)
        const creditor = row[Object.keys(row)[1]]; // Second column (creditor)
        const amount = parseFloat(row[Object.keys(row)[2]]); // Amount (third column)

        // Create a unique key for each debtor-creditor pair
        const key = `${debtor}-${creditor}`;

        // Initialize if the key doesn't exist
        if (!totalOwed[key]) {
          totalOwed[key] = 0;
        }

        // Accumulate the amount
        totalOwed[key] += amount; // Sum the amounts for the same debtor-creditor relationship
      })
      .on('end', () => {
        console.log('CSV file successfully processed:', totalOwed);  // Log entire totals
        
        // Convert totalOwed object to the desired output format
        const results = [];
        for (const key in totalOwed) {
          const [debtor, creditor] = key.split('-');
          results.push({ debtor, creditor, total: totalOwed[key].toFixed(2) }); //format the results to two decimal places
        }

        res.send({ message: 'File uploaded and processed', data: results });  // Send the totals back in the response
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        res.status(500).send({ error: 'Failed to process file' });
      });
  } else {
    res.status(400).send({ error: 'No file uploaded' });
  }
});

module.exports = router;
