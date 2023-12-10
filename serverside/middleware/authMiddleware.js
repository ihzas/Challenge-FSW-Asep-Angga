const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = 'your-secret-key'; // Change this to a secure secret key

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

const generateToken = (user) => {
    const payload = {
        username: user.username,
        role: user.role,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).send('Invalid token.');
    }

    req.user = decoded;
    next();
};

module.exports = {
    hashPassword,
    comparePasswords,
    generateToken,
    verifyToken,
    authenticateToken
};
