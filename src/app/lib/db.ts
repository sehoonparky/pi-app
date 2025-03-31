import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = {
  conn: null,
  promise: null,
};

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Db connected");
      cached.conn = mongoose;
      return mongoose;
    });
  }

  try {
    if (!cached.promise) {
      throw new Error("cached.promise is null");
    }
    await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  if (!cached.conn) {
    throw new Error("cached.conn is null");
  }
  return cached.conn;
}

export default dbConnect;
