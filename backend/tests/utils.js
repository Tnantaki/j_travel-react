const { User } = require('../models/user');

function generateAdmin() { 
    const user = new User({
        email: 'test@email.com',
        password: '123456678',
        isAdmin: true
    })

    const token = user.generateAuthToken();

    return token;
}

module.exports = {
    generateAdmin
};
