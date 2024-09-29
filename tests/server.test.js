const request = require('supertest');
const { app, server } = require('../server');  // Import the app and server

describe('File Upload Tests', () => {
  afterAll((done) => {
    // Close the server after tests are done to prevent hanging
    server.close(done);
  });

  it('should successfully upload a CSV file', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('file', './tests/tests_files/debts.csv')  // Path to the CSV test file
      .expect(200);  // Expect success status code

    expect(res.body).toHaveProperty('data');
    expect(res.body.message).toBe('File uploaded and processed');
  });

  it('should return error when uploading a non-CSV file', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('file', './tests/tests_files/debts.txt')  // Path to the non-CSV test file
      .expect(400);  // Expect error status code

    expect(res.body.error).toBe('Only CSV files are allowed');
  });
});
