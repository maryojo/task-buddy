const dotenv = require('dotenv');
dotenv.config();

const { generateToken } = require('./jwtUtils');

const payload = {
  userId: 123,
  name: 'john', 
};

const token = generateToken(payload);

process.env.JWT_TOKEN = token;
