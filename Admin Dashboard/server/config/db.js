// server/config/db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://prathamchintrate:PQVbcXiAqUQw6uMA@cluster0.5o7do.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Use your actual connection string

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
