const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const { Profile } = require('../../models/profile');
const { generateAdmin, generateProfile } = require('../utils');
let server;

describe('/api/users', () => {
	beforeEach(() => {server = require('../../index');});
	afterEach( async () => {
		await new Promise(resolve => server.close(resolve));
		await User.deleteMany({});
		await Profile.deleteMany({});
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
		let token;
		let id;

		const exec = async () => {
			return await request(server)
				.get('/api/users/' + id)
				.set('x-auth-token', token);
		};

		beforeEach(() => {
			id = '';
			token = generateAdmin();
		});

		it('should return a user if valid id passed', async () => {
			const user = new User({
				email: 'user1@email.com',
				password: '12345678',
				isAdmin: false
			});
			await user.save();

			id = user._id;

			const res = await exec();

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('email', user.email);

		});

		it('should return 404 if invalid id is passed', async () => {
			id = '1';

			const res = await exec();
			
			expect(res.status).toBe(404);
		});

		it('should return 404 if no user with the given id', async () => {
			id = new mongoose.Types.ObjectId();

			const res = await exec();
			
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

		it('should return 404 if user with the given id does not exist', async () => {
			await User.findOneAndDelete(user._id);

			const res = await exec(plainPassword);

			expect(res.status).toBe(404);
		});

		const cases = [
			{ desc: 'invalid old password', oldPassword: 'aaaaaaaaa', status: 400},
			{ desc: 'old password is less than 8 chars', oldPassword: '1', status: 400},
			{ desc: 'old password is longer than 255 chars', oldPassword: new Array(258).join('1'), status: 400}
		];

		cases.forEach(({ desc, oldPassword, status}) => {
			it(`should return ${status} if ${desc} `, async () => {
				const res = await exec(oldPassword);
				expect(res.status).toBe(status);
			});
		});

	});

	describe('DELETE /me', () => {
		let user;
		let profile;
		let token;
		
		const exec = async () => {
			return await request(server)
				.delete('/api/users/me')
				.set('x-auth-token', token);
		}

		beforeEach(async () => {
			user = new User({
				email: 'test@email.com',
				password: '123456678'
			})
			await user.save();

			profile = generateProfile(user._id);

			token = user.generateAuthToken();
		})

		it('should return 200 if the user is deleted', async () => {
			const res = await exec();

			const delUser = await User.findById(user._id);
			const userProfile = await Profile.findOne({user: user._id});

			expect(res.status).toBe(200);
			expect(delUser).toBeNull();
			expect(userProfile).toBeNull();
		})

		it('should return 404 if the user does not exist', async () => { 
			await User.findByIdAndDelete(user._id);

			const res = await exec();

			expect(res.status).toBe(404);
		})
	})

	describe('DELETE /:id', () => {
		let user;
		let profile;
		let token;
		let id;
		const admin = generateAdmin();
		
		
		const exec = async () => {
			return await request(server)
				.delete('/api/users/' + id)
				.set('x-auth-token', admin);
		}

		beforeEach(async () => {
			user = new User({
				email: 'test@email.com',
				password: '123456678', 
			})
			await user.save();

			id = user._id;
			token = user.generateAuthToken();
			profile = generateProfile(user._id);
		})

		it('should return 200 if the user is deleted and id is valid', async () => {
			const res = await exec();

			const delUser = await User.findById(user._id);

			const delProfile = await Profile.findOne({user: user._id});

			expect(res.status).toBe(200);
			expect(delUser).toBeNull();
			expect(delProfile).toBeNull();
		})

		it('should return 404 if the user does not exist', async () => {
			await User.findByIdAndDelete(user._id);

			const res = await exec();

			expect(res.status).toBe(404);
		})
	})
});
