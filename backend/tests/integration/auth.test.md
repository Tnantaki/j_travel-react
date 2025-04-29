const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../models/user');
let server;

describe('auth middleware', () => {
    beforeEach(() => {server = require('../../index');});
	afterEach( async () => {
		await new Promise(resolve => server.close(resolve));
	});
	afterAll(async () => {await mongoose.disconnect();});

    let token;

    const exec = () => {
        return request(server)
            .post('/api/users')
            .set('x-auth-token', token)
            .send()
    }
});