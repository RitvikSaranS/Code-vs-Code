import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route";
import authenticateToken from "./middlewares/auth.middleware";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4300;

app.use(express.json());

app.use("/auth", authRoutes);
app.use(authenticateToken);

app.get("/resource", (req, res) => {
  res.status(201).json({ message: "Resource Send Successfully" });
});

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {}).then(() => {
  console.log("Database is connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
