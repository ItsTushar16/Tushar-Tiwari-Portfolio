const mongoose = require("mongoose");

// On a traditional server, connectDB() runs once at startup. On Vercel,
// every invocation calls it — a cold start actually connects, a warm one
// reuses the connection already sitting in this module's memory. Caching
// on `global` (not just a local variable) survives Vercel reusing the same
// container/module cache across invocations within that container's life.
let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URL, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 8000, // fail in ~8s instead of hanging if Atlas is unreachable
        bufferCommands: false, // if a query ever runs before the connection is ready, fail immediately instead of silently queuing for up to 10s
      })
      .then((m) => {
        console.log("Connected to DB");
        return m;
      })
      .catch((err) => {
        cached.promise = null; // let the next call retry instead of staying stuck on a failed promise
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
