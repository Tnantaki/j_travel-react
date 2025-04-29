const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
		it('should return 401 if user is not logged in', async () => {
			const res = await request(server).get('/api/users')
			
			expect(res.status).toBe(401);
		});

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

	describe('POST /', () => {
		let user;

		const exec = async () => {
			return await request(server)
				.post('/api/users')
				.send(user);
		};

		beforeEach(() => {
			user = {
				email: 'test@email.com',
				password: '12345678',
				isAdmin: false
			};
		});

		it('should return 400 if email is less than 3 characters', async () => {
			user.email = 'a';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if email is more than 50 characters', async () => {
			user.email = new Array(52).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if password is less than 8 characters', async () => {
			user.password = 1

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if password is more than 255 characters', async () => {
			user.password = new Array(258).join('1');

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if the email is already registered', async () => {
			const existdUser = new User({
				email: 'test@email.com',
				password: '12345678',
				isAdmin: true
			});
			await existdUser.save();

			user.isAdmin = true;

			const res = await exec();

			const regUser = await User.find({email: 'test@email.com'});

			expect(regUser).not.toBeNull();
			expect(regUser.length).toBe(1);
			expect(regUser.some(u => u.email === 'test@email.com')).toBeTruthy();
			expect(regUser.some(u => u.isAdmin === true)).toBeTruthy();
			expect(res.status).toBe(400);
		});

		it('should save the user if it is valid', async () => {
			const res = await exec();
			
			const newUser = await User.findOne({email: 'test@email.com'});

			expect(res.status).toBe(200);
			expect(newUser).not.toBeNull();
		});

		it('should return user if it is valid', async () => {
			const res = await exec();
			
			const newUser = await User.findOne({email: 'test@email.com'});

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('email', newUser.email); //only send email to the body (no Id)
		});
	});

	describe('POST /me/change-password', () => {
		let plainPassword;
		let user;
		let token;

		const exec = async (oldPassword) => {
			return await request(server)
				.post('/api/users/me/change-password')
				.set('x-auth-token', token)
				.send({
					oldPassword: oldPassword,
					newPassword: '00000000' 
				});
		};

		beforeEach(async () => {
			plainPassword = '12345678';
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(plainPassword, salt);

			user = new User({
				email: 'test@email.com',
				password: hashedPassword,
				isAdmin: false
			});
			await user.save();

			token = user.generateAuthToken();

		});

		it('should return 200 if the new password is valid', async () => {
			const res = await exec(plainPassword);
			
			expect(res.status).toBe(200);
		});

		it('should return 400 if the old password is invalid', async () => {
			const oldPassword = 'aaaaaaaaaa';

			const res = await exec(oldPassword);

			expect(res.status).toBe(400);
		});
	});
});
