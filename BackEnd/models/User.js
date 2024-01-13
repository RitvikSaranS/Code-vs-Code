const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getUserByUsername(username) {
  try {
    await client.connect();
    const database = client.db("CVC");
    const user = await database.collection("user_table").findOne({ "UT_Username": username });
    return user;
  } finally {
    await client.close();
  }
}

async function createUser(username, hashedPassword, email, userstatus) {
  try {
    await client.connect();
    const database = client.db("CVC");
    await database.collection("user_table").insertOne({
      "UT_Username": username,
      "UT_Password": hashedPassword,
      "UT_Email": email,
      "UT_UserStatus": userstatus
    });
  } finally {
    await client.close();
  }
}

module.exports = {
  getUserByUsername,
  createUser,
};
