import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.info("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
}
