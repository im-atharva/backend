import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URI}/${DB_NAME}`;
    const connectionInstance = await mongoose.connect(connectionString);
    console.log(
      `\n MongoDB connected!! DB_HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
