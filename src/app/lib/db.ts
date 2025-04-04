import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let isConnected = false;

const isProduction = process.env.NODE_ENV === "production";

export const dbConnect = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGO_URI as string,
      bufferCommands: !isProduction, 
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
