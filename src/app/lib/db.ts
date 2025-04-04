import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

async function dbConnect() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("Database Connected");
    } catch (err) {
      console.error("Unable to connect to the database ", err);
    }
  } else {
    console.error("Mongo URL not found");
  }
}

export default dbConnect;
