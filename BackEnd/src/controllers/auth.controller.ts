import { Request, Response } from "express";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import logger from "../utils/logger";
import UserModel from "../models/user.model";
require("dotenv").config();

const secretKey: string | undefined = process.env.AUTH_SECRET_KEY;

// User Registration
export async function Register(req: Request, res: Response) {
  try {
    const createdUser = await UserModel.create(req.body);
    console.log(createdUser);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Registration failed" });
    logger(error.message, path.basename(__filename));
  }
}

// User login
export async function Login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ userName: username });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed! User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed! Incorrect Password" });
    } else if (secretKey) {
      const token = jwt.sign({ userId: user?.userName }, secretKey, {
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
