import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
        console.log('Database connected');
        });
    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;