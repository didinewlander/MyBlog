const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
    userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(10));
    return await UserModel.create(userData);
};

const findUserByUsername = async (username) => {
    return await UserModel.findOne({ username });
};

module.exports = {
    createUser,
    findUserByUsername,
};
