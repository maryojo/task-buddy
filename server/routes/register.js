const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');



const secretKey = process.env.SECRET_KEY;

router.post('/', async (req, res) => {

  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const newUser = await User.create({ email, password, name });
    const newUserId = newUser.id
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
