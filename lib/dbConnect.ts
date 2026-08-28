import mongoose from 'mongoose';

// Prefer 127.0.0.1 over localhost for Node 18+ IPv6 resolution safety
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_job_kit';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Quick 3-second timeout so it never hangs for 30s
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (e) {
    cached!.promise = null;
    console.warn('MongoDB connection failed. Falling back to in-memory store:', (e as Error).message);
    return null; // Return null gracefully instead of throwing uncaught exception
  }
}

export default dbConnect;
