const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../models/user');
const { generateAdmin } = require('../utils');
let server;

describe('auth middleware', () => {
	beforeEach(() => {
		server = require('../../index');
		token = generateAdmin();
	});
	afterEach( async () => {
		await User.deleteMany({});
		await new Promise(resolve => server.close(resolve));
	});
	afterAll(async () => {await mongoose.disconnect();});

	let token;

	const exec = () => {
		return request(server)
			.get('/api/users')
			.set('x-auth-token', token)
	};

   it('should return 401 if no token is provided', async () => {
		token = '';

		const res = await exec();

		expect(res.status).toBe(401);
   });

   it('should return 400 if no token is invalid', async () => {
		token = 'a';

		const res = await exec();

		expect(res.status).toBe(400);
   });

   it('should return 200 if no token is valid', async () => {
		const res = await exec();

		expect(res.status).toBe(200);
   });
});