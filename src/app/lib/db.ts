import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

// Cached connection object to prevent multiple connections
const cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<Mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Database connected successfully.");
      cached.conn = mongoose;
      return mongoose;
    });
  }

  try {
    await cached.promise;
  } catch (error) {
    console.error("Database connection error:", error);
    cached.promise = null;
    throw error;
  }

  if (!cached.conn) {
    throw new Error("Database connection failed.");
  }

  return cached.conn;
}

export default dbConnect;
