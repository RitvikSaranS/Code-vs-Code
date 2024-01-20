import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
require("dotenv").config();
const logger = require("../utils/logger");

const secretKey: string | undefined = process.env.AUTH_SECRET_KEY;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    if (secretKey) {
      jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        next();
      });
    }
  } catch (error: any) {
    logger(error.message, path.basename(__filename));
  }
}

export default authenticateToken;
