import express from "express";
import { Register, Login } from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

export default router;
