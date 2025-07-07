import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function  dbConnect(){
  const url = process.env.URL;
  await mongoose.connect(url);
  console.log("conecting...");
}