const { User } = require('../../../models/user');
const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const { validateId, validateIds } = require('../../../middlewares/validateObjId');

describe('validateId middleware', () => {
	let server;
	let token;

	beforeEach(() => {
		server = require('../../../index');
		const user = new User({ email: 'admin@test.com', password: '123456', isAdmin: true });
		token = user.generateAuthToken();
	});

	afterEach(async () => {
		await server.close();
	});

	it('should return 404 if ObjectId is invalid', async () => {
		const res = await request(server)
		.delete('/api/users/1234') // Invalid ObjectId
		.set('x-auth-token', token);

		expect(res.status).toBe(404);
		expect(res.text).toMatch(/Invalid ID/);
	});
});

describe('validateIds middleware', () => {
	let server;
	let token;

	beforeEach(() => {
		server = require('../../../index');
		const user = new User({ email: 'admin@test.com', password: '123456', isAdmin: true });
		token = user.generateAuthToken();
	});

	afterEach(async () => {
		await server.close();
	});

	const exec = (ids) => {
		return request(server)
		.delete('/api/users/delete-users')
		.set('x-auth-token', token)
		.send({ ids });
	};

	it('should return 404 if ids is not an array', async () => {
		const res = await exec('not-an-array');

		expect(res.status).toBe(404);
		expect(res.text).toMatch(/Invalid ID/);
	});

	it('should return 404 if ids is an empty array', async () => {
		const res = await exec([]);

		expect(res.status).toBe(404);
		expect(res.text).toMatch(/Invalid ID/);
	});

	it('should return 404 if any ID in the array is invalid', async () => {
		const res = await exec(['validIdHereButFake', '1234']);

		expect(res.status).toBe(404);
		expect(res.text).toMatch(/Invalid ID/);
	});
});
