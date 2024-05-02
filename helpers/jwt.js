const jwt = require('jsonwebtoken');

const generateToken = payload => jwt.sign(payload, process.env.SECRET_KEY);
const verifyToken = token => jwt.verify(token, process.env.SECRET_KEY);

module.exports = { generateToken, verifyToken };