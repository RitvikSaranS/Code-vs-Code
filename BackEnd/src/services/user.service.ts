const { MongoClient } = require("mongodb");
const path = require("path");
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
    return user;
  } catch (error: any) {
    logger(error.message, path.basename(__filename));
  } finally {
    await client.close();
  }
}

export async function createUser(
  username: string,
  hashedPassword: string,
  email: string,
  firstname: string,
  lastname: string,
  alternatemail: string
) {
  try {
    await client.connect();
    const database = client.db("CVC");
    await database.collection("user_table").insertOne({
      UT_Username: username,
      UT_Password: hashedPassword,
      UT_Email: email,
      UT_FirstName: firstname,
      UT_LastName: lastname,
      UT_LastLoginDate: null,
      UT_ProfilePicturePath: null,
      UT_RegistrationDate: new Date(),
      UT_AlternateMail: alternatemail,
      UT_UserStatus: "A",
    });
  } catch (error: any) {
    logger(error.message, path.basename(__filename));
  } finally {
    await client.close();
  }
}
