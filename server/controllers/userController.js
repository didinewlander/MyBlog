const UserDAL = require('../data/UserDAL');
const auth = require('../services/authentication');
const bcrypt = require('bcryptjs');
const register = async (req, res) => {
    try {
        const userDoc = await UserDAL.createUser(req.body);
        res.json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userDoc = await UserDAL.findUserByUsername(username);
        if (!userDoc) {
            return res.status(400).json('User not found');
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            const token = auth.generateToken({ username, id: userDoc._id });

            // Set cookie with httpOnly and secure flags
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).json({
                id: userDoc._id,
                username,
            });
        } else {
            res.status(400).json('wrong credentials');
        }
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};


const profile = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json('No token provided');
        }

        const info = auth.verifyToken(token);
        res.json(info);
    } catch (e) {
        console.log(e);
        res.status(400).json('An error occurred');
    }
};


const logout = async (req, res) => {
    res.cookie('token', '').json('ok');
};

module.exports = {
    register,
    login,
    profile,
    logout
};
