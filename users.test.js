const request = require('supertest');
const app = require('../MEAN_backend/app');
const mongoose = require('mongoose');

describe('POST /users/addBooks', () => {
    it('should add a book and return 201 status', async () => {
        const response = await request(app).post('/users/addBooks');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ title: '1', author: 'John Doe',description:"new content given",publicationYear:"2024",ISBN:"84-12-45454-55" });
    });

    it('should return 404 if the user is not found', async () => {
        const response = await request(app).post('/users/addBooks');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Book not added' });
    });
});
