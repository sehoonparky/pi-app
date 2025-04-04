import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable.");
}

let isConnected = false;

export const dbConnect = async () => {
  // If already connected, return early
  if (isConnected) {
    return;
  }

  try {
    // Connect with simplified options
    const connection = await mongoose.connect(MONGODB_URI);

    isConnected = connection.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
