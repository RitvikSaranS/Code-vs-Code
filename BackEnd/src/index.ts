import express from "express";
import authRoutes from "./routes/auth.route";
import authenticateToken from "./middlewares/auth.middleware";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use(authenticateToken);

app.get("/resource", (req, res) => {
  res.status(201).json({ message: "Resource Send Successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
