const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGO_URL");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    //Exit App
    process.exit(1);
  }
};

module.exports = connectDB;
