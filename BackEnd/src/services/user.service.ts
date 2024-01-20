const { MongoClient } = require("mongodb");
const path = require("path");
import { User } from "../models/user.model";
import logger from "../utils/logger";
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function getUserByUsername(username: string) {
  try {
    await client.connect();
    const database = client.db("CVC");
    const user = await database
      .collection("user_table")
      .findOne({ UT_Username: username });
    console.log(user);
    return user;
  } catch (error: any) {
    logger(error.message, path.basename(__filename));
  } finally {
    await client.close();
  }
}

export async function createUser(user: User) {
  try {
    await client.connect();
    const database = client.db("CVC");
    await database.collection("user_table").insertOne({
      UT_Username: user.Username,
      UT_Password: user.Password,
      UT_Email: user.Email,
      UT_FirstName: user.FirstName,
      UT_LastName: user.LastName,
      UT_LastLoginDate: user.LastLoginDate,
      UT_ProfilePicturePath: user.ProfilePicturePath,
      UT_RegistrationDate: user.RegistrationDate,
      UT_AlternateMail: user.AlternateMail,
      UT_UserStatus: user.UserStatus,
    });
  } catch (error: any) {
    logger(error.message, path.basename(__filename));
  } finally {
    await client.close();
  }
}
