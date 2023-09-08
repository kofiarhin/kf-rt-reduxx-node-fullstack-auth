const mongoose = require("mongoose");

const connect = async () => {
  try {
    // const url = "mongodb://localhost/auth";
    const url = process.env.MONGO_URI;
    const conn = await mongoose.connect(url);
    console.log(`connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connect;
