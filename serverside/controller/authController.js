const db = require('../database/db');
const { hashPassword, comparePasswords, generateToken, verifyToken } = require('../middleware/authMiddleware');

const getAllUsers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
};

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        await db.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hashedPassword, role]);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).send('Internal Server Error');
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const match = await comparePasswords(password, result.rows[0].password);

        if (match) {
            const token = generateToken(result.rows[0]);
            res.status(200).json({ token });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error logging in user', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserProfile = async (req, res) => {
    // Middleware to verify token is applied before reaching this function
    const { user } = req;

    res.status(200).json({
        username: user.username,
        role: user.role,
    });
};

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserProfile,
};
