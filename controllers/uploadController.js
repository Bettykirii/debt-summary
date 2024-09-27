const csvProcessor = require('../utils/csvProcessor');
const fs = require('fs');
const archiver = require('archiver');

// Controller to process uploaded CSV file
exports.processFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process the CSV file and summarize debts
    const summarizedData = csvProcessor.summarizeCSV(req.file.path);

    // Generate summarized CSV and PDF
    const csvFile = csvProcessor.generateCSV(summarizedData);
    const pdfFile = csvProcessor.generatePDF(summarizedData);

    // Prepare a ZIP file for download
    const output = fs.createWriteStream('./output/summary.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.append(fs.createReadStream(csvFile), { name: 'summary.csv' });
    archive.append(fs.createReadStream(pdfFile), { name: 'summary.pdf' });
    archive.finalize();

    output.on('close', () => {
      res.download('./output/summary.zip');
    });

  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
};
