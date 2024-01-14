const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getUserByUsername(username) {
  try {
    await client.connect();
    const database = client.db("CVC");
    const user = await database
      .collection("user_table")
      .findOne({ UT_Username: username });
    return user;
  } catch (error) {
    logger(error.message);
  } finally {
    await client.close();
  }
}

async function createUser(
  username,
  hashedPassword,
  email,
  firstname,
  lastname,
  alternatemail
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
  } catch (error) {
    logger(error.message);
  } finally {
    await client.close();
  }
}

module.exports = {
  getUserByUsername,
  createUser,
};
