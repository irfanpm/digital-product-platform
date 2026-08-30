import mongoose from 'mongoose';

// Prefer 127.0.0.1 over localhost for Node 18+ IPv6 resolution safety
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_job_kit';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastFailedAt: number | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null, lastFailedAt: null };
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  // Circuit breaker: if we failed less than 15 seconds ago, don't try again yet.
  if (cached!.lastFailedAt && Date.now() - cached!.lastFailedAt < 15000) {
    return null;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1500, // Faster failure
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
    cached!.lastFailedAt = null; // reset on success
    return cached!.conn;
  } catch (e) {
    cached!.promise = null;
    cached!.lastFailedAt = Date.now();
    console.warn('MongoDB connection failed. Falling back to in-memory store:', (e as Error).message);
    return null; // Return null gracefully instead of throwing uncaught exception
  }
}

export default dbConnect;
