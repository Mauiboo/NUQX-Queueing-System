const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

let db;

async function connectToMongo() {
  const client = new MongoClient(process.env.ATLAS_URI);

  try {
    await client.connect();
    db = client.db("LoginCredentials");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

function getDb() {
  return db;
}

module.exports = connectToMongo;
module.exports.getDb = getDb;
