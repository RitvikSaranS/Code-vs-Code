const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../utils/logger");

const secretKey = process.env.AUTH_SECRET_KEY;

function authenticateToken(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  } catch (error) {
    logger(error.message, path.basename(__filename));
  }
}

module.exports = authenticateToken;
