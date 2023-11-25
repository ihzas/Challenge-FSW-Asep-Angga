const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function register(req, res) {
    const { username, password } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function addAdmin(req, res) {
    const { username, password } = req.body;

    try {
        const superadmin = await User.findOne({ where: { role: 'superadmin' } });

        if (!superadmin) {
            return res.status(403).json({ message: 'Permission Denied: Only superadmin can add an admin' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const admin = await User.create({ username, password: hashedPassword, role: 'admin' });

        res.json({ message: 'Admin added successfully', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
}

function generateToken(user) {
    return jwt.sign({ username: user.username, role: user.role }, process.env.SECRET_KEY, {
        expiresIn: '1h',
    });
}

module.exports = {
    login,
    register,
    addAdmin,
    authenticateToken,
};
