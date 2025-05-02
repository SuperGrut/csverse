import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
    );
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export { connectToDB };
