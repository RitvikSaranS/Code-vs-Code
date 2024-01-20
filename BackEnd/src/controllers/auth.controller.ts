import { Request, Response } from "express";
import path from "path";
import { getUserByUsername, createUser } from "../services/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { User } from "../models/user.model";
require("dotenv").config();

const secretKey: string | undefined = process.env.AUTH_SECRET_KEY;

// User Registration
export async function Register(req: Request, res: Response) {
  try {
    const { username, password, email, firstname, lastname, alternatemail } =
      req.body;
    const userExists = await getUserByUsername(username);
    if (userExists) {
      res.status(409).send({ message: "User already exists, Please login" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(
        new User(
          username,
          hashedPassword,
          email,
          firstname,
          lastname,
          "",
          "",
          new Date(),
          "",
          "A"
        )
      );
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Registration failed" });
    logger(error.message, path.basename(__filename));
  }
}

// User login
export async function Login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed!  Please register" });
    }

    const passwordMatch = await bcrypt.compare(password, user.UT_Password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed! Incorrect Password" });
    }

    if (secretKey) {
      const token = jwt.sign({ userId: user.UT_UserID }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(500).json({ error: "Login failed - Secret key is undefined" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Login failed" });
    logger(error.message, path.basename(__filename));
  }
}
