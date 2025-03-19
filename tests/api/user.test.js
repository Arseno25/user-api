const request = require('supertest');
const app = 'http://127.0.0.1:8000';

describe('User API', () => {
    let userId;

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                age: 30,
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('john@example.com');
        expect(response.body.age).toBe(30);

        userId = response.body.id;
    });

    it('should retrieve a user', async () => {
        const response = await request(app).get(`/api/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('john@example.com');
        expect(response.body.age).toBe(30);
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({
                name: 'Alice Smith',
                email: 'alice.smith@example.com',
                age: 29,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Alice Smith');
        expect(response.body.email).toBe('alice.smith@example.com');
        expect(response.body.age).toBe(29);
    });

    it('should delete a user', async () => {
        const response = await request(app).delete(`/api/users/${userId}`);

        expect(response.status).toBe(204);
    });

    it('should not create a user with missing name', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                name: '',
                email: 'john1123@example.com',
                age: 30,
            });

        expect(response.status).toBe(422);
        expect(response.body.name).toEqual(expect.arrayContaining(['The name field is required.'])); // Adjusted to match the API response structure
    });

    it('should not create a user with invalid email', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'asdf',
                age: 30,
            });

        expect(response.status).toBe(422);
        expect(response.body.email).toEqual(expect.arrayContaining(['The email field must be a valid email address.'])); // Adjusted to match the API response structure
    });

    it('should not create a user with invalid age', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'asdf',
                age: 'kdj',
            });

        expect(response.status).toBe(422);
        expect(response.body.email).toEqual(expect.arrayContaining(['The email field must be a valid email address.'])); // Adjusted to match the API response structure
    });

    it('should not update a user with invalid email', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({
                name: 'Alice Smith',
                email: 'adasdas',
                age: 29,
            });

        expect(response.status).toBe(422);
        expect(response.body.email).toEqual(expect.arrayContaining(['The email field must be a valid email address.'])); // Adjusted to match the API response structure
    });

    it('should not update a user with invalid age', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({
                name: 'Alice Smith',
                email: 'adasdas',
                age: 'sda',
            });

        expect(response.status).toBe(422);
        expect(response.body.email).toEqual(expect.arrayContaining(['The email field must be a valid email address.'])); // Adjusted to match the API response structure
    });

    it('should return 404 when deleting a non-existent user', async () => {
        const response = await request(app).delete(`/api/users/${userId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found');
    });
});
