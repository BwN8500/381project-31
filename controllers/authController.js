const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistedToken');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'Wrong email or password' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(404).send({ message: 'Wrong email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '8h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });

        res.status(200).send({ message: 'Login success', role: user.role });
    } catch (error) {
        res.status(500).send({ message: 'Login fail' });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).send({ message: 'No token found' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const blacklistedToken = new BlacklistedToken({ token, expiresAt: new Date(decoded.exp * 1000) });
        await blacklistedToken.save();

        res.clearCookie('token');
        return res.status(200).send({ message: 'Logout success' });
    } catch (error) {
        return res.status(500).send({ message: 'Logout failed' });
    }
};