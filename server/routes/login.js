const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models");
// const { generateToken} = require('../authentication/jwtUtils');

const secretKey = process.env.SECRET_KEY;

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const isValid = await validateCredentials(email, password);
    if (isValid === false) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    {
      const user = await User.findOne({ where: { email } });
      const userId = user.id;
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
      res.status(200).json({ token, userId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Function to validate user credentials
async function validateCredentials(email, password) {
  try {
    const user = await User.findOne({
      where: { email, password },
    });

    return user !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = router;
