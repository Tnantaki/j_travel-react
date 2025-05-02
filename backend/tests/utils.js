const { User } = require('../models/user');
const { Profile } = require('../models/profile');

function generateAdmin() { 
	const user = new User({
		email: 'test@email.com',
		password: '123456678',
		isAdmin: true
	})

	const token = user.generateAuthToken();

	return token;
}

async function generateProfile(userId) {
	const profile = new Profile({
		user: userId,
			username: "test",
			address: {
				street: "Sukhumvit Road",
				building: "Siam Paragon",
				houseNo: "123",
				district: "Watthana",
				postalCode: "10110",
				subDistrict: "Khlong Tan Nuea",
				province: "Bangkok",
				country: "Thailand"
			},
			phone: "0812345678",
			email: "prach@email.com",
			birthday: "1990-05-15",
			gender: "male",
			idNumber: "1111111111111",
			passportNumber: "1234"
	});
	await profile.save();

	return profile;
}

module.exports = {
	generateAdmin,
	generateProfile
};
