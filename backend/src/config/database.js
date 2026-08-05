const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
}

module.exports = connectToDB;