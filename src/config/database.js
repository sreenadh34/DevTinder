import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGODB_URL;

const connectDB= async () => {
  await mongoose.connect(mongoUrl)
  .then(() =>{
    console.log("MongoDB connected...");
  })
  .catch(err => {
    console.log("Error connecting to MongoDB");
  });
};

export default connectDB;