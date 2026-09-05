import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://hbsdevelopersteam_db_user:lo1oNnVIRbBzCHLk@cluster0.mklmd92.mongodb.net/?appName=Cluster0";

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

const g = global as unknown as { _mongoose?: Cache };
const cached: Cache = g._mongoose || { conn: null, promise: null };
g._mongoose = cached;

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
