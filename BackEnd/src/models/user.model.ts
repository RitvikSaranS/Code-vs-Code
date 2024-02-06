import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import path from "path";
import logger from "../utils/logger";

const saltRounds = 10;

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
  },
  lastLoginDate: {
    type: Date,
    default: new Date(),
  },
  profilePicturePath: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: new Date(),
  },
  alternateMail: {
    type: String,
  },
  userStatus: {
    type: String,
    default: "A",
  },
});

User.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    logger(error.message, path.basename(__filename));
    next();
  }
});

const UserModel = mongoose.model("User", User);

export default UserModel;
