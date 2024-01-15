const express = require("express");
const path = require("path");
const router = express.Router();
const { getUserByUsername, createUser } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
require("dotenv").config();

const secretKey = process.env.AUTH_SECRET_KEY;

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, firstname, lastname, alternatemail } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(
      username,
      hashedPassword,
      email,
      firstname,
      lastname,
      alternatemail
    );
    rees.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
    logger(error.message, path.basename(__filename));
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.UT_Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user.UT_UserID }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
    logger(error.message, path.basename(__filename));
  }
});

module.exports = router;
