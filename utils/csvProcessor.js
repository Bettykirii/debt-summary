const fs = require('fs');
const csv = require('csv-parser');

// Summarize debts from the CSV file
exports.summarizeCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const summary = {};

    fs.createReadStream(filePath)
      .pipe(csv( {headers : true}))
      .on('data', (row) => {
        console.log('Processing row:', row);

        // Destructure row data
        const debtor = row['0'];
        const creditor = row['1'];
        const amount = parseFloat(row['2']);

        // Ensure valid values before processing
        if (!debtor || !creditor || isNaN(amount)) {
          console.error('Invalid row:', row);
          return;
        }

        // Create unique keys for each debtor-creditor pair
        const key = `${debtor},${creditor}`;
        const reverseKey = `${creditor},${debtor}`;

        // Handle debts
        if (summary[reverseKey]) {
          summary[reverseKey] -= amount; // Reduce debt if it exists in reverse
          if (summary[reverseKey] <= 0) {
            delete summary[reverseKey]; // Remove entry if no debt remains
          }
        } else {
          // Otherwise, add or update the amount owed
          summary[key] = (summary[key] || 0) + amount;
        }
      })
      .on('end', () => {
        console.log('Debts summary:', summary);
        resolve(summary); // Resolve the promise with the summary
      })
      .on('error', (error) => {
        reject(error); // Reject the promise on error
      });
  });
};
