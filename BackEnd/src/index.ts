import express from 'express';
import authRoutes from './auth/authController'
import authenticateToken from './auth/authMiddleware'

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use("/auth", authRoutes);
app.use(authenticateToken);

app.get("/resource", (req, res) => {
  res.status(201).json({ message: "Resource Send Successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});