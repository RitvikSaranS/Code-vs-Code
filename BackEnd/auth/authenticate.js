// routes/auth.js
const express = require('express');
const router = express.Router();
const { getUserByUsername, createUser } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
router.get('/register', async (req, res) => {
    try {
      res.status(201).json({ message: 'Registration End Point Successful' });
    } catch (error) {
      res.status(500).json({ error: 'Registration End Point failed' });
    }
  });


router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword, email, "A");
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    console.log(error.message);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.UT_Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.UT_UserID }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
