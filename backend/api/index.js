
require("dotenv").config();

const app = require("../expressApp");
const connectDB = require("../config/db");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    
    console.error("DB connection failed:", err.message);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: "Database unavailable, please try again shortly" }));
  }
  return app(req, res);
};
