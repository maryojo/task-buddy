const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 

function generateToken(payload) {
  // Generate the token using the payload and secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = { generateToken };
