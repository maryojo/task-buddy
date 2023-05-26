const express = require('express');
const router = express.Router();

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

    const token = generateToken(newUser.id);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
