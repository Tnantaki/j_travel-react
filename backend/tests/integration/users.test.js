const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../models/user');
const { generateAdmin } = require('../utils');
let server;

describe('/api/users', () => {
	beforeEach(() => {server = require('../../index');});
	afterEach( async () => {
		await new Promise(resolve => server.close(resolve));
		await User.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.disconnect();
	})

	describe('GET /', () => {
		it('should return all users', async () => {
			await User.collection.insertMany([
				{email: 'aaa@email.com'},
				{email: 'bbb@email.com'},
			]);

			const token = generateAdmin();

			const res = await request(server)
				.get('/api/users')
				.set('x-auth-token', token);
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(u => u.email === 'aaa@email.com')).toBeTruthy();
			expect(res.body.some(u => u.email === 'bbb@email.com')).toBeTruthy();
		})
	});

	describe('GET /:id', () => {
		const token = generateAdmin();
		it('should return a user if valid id passed', async () => {
			const user = new User({
				email: 'user1@email.com',
				password: '12345678',
				isAdmin: false
			});
			await user.save();

			const res = await request(server)
				.get('/api/users/' + user._id)
				.set('x-auth-token', token);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('email', user.email);

		});

		it('should return 404 if invalid id is passed', async () => {
			const res = await request(server)
				.get('/api/users/1')
				.set('x-auth-token', token);
			
			expect(res.status).toBe(404);
		});
	});

	describe('GET /me', () => {
		it('should return the current user', async () => {
			const user = new User({
				email: 'user1@email.com',
				password: '12345678',
				isAdmin: true
			});
			await user.save();

			const token = user.generateAuthToken();

			const res = await request(server)
				.get('/api/users/me')
				.set('x-auth-token', token)

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('email', user.email);

		});
	});
});
