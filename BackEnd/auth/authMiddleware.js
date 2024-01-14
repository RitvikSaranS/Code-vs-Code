const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.AUTH_SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
