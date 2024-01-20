import express from 'express';
import path from "path";
import { getUserByUsername, createUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
require("dotenv").config();

const secretKey: string | undefined = process.env.AUTH_SECRET_KEY;
const router = express.Router();

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
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
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

    if (secretKey) {
      const token = jwt.sign({ userId: user.UT_UserID }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      // Handle the case where secretKey is undefined
      res.status(500).json({ error: "Login failed - Secret key is undefined" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Login failed" });
    logger(error.message, path.basename(__filename));
  }
});

export default router;
