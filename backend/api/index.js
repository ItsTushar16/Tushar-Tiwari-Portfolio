// Vercel's entry point for the whole API. Vercel detects this file and turns
// it into a single Serverless Function; vercel.json rewrites every request
// path to it, and Express's own routing (in app.js) takes it from there.
//
// There's no app.listen() here on purpose — Vercel calls this exported
// function directly with (req, res) for every request, the same way Express
// itself would. A cold start runs connectDB() for real; a warm one reuses
// the cached connection from config/db.js almost instantly.
require("dotenv").config();

const app = require("../expressApp");
const connectDB = require("../config/db");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    // Fail fast and clearly instead of letting a doomed request fall through
    // to Express, buffer on the first query, and time out 10s later with a
    // confusing Mongoose error. Check MONGO_URL and Atlas Network Access.
    console.error("DB connection failed:", err.message);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: "Database unavailable, please try again shortly" }));
  }
  return app(req, res);
};
