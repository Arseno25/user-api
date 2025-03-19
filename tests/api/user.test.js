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

        userId = response.body.id; // Simpan ID user untuk pengujian selanjutnya
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
});
