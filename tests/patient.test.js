const request = require('supertest');
const app = require('../Server'); // export your express app in server.js
const mongoose = require('mongoose');

describe('Patient API', () => {
    it('should return 401 when no token provided', async () => {
        const res = await request(app).get('/api/patients');
        expect(res.statusCode).toBe(401);
    });
    // Add more tests for POST, PUT, DELETE
});

afterAll(async () => {
    await mongoose.connection.close();
});


