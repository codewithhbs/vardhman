import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vardhman";

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
