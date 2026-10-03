require("dotenv").config();

const app = require("./expressApp");
const connectDB = require("./config/db");
const startInquirySummaryJob = require("./corn/inquirySummaryJob");

// Render (and most traditional hosts) assign the port via env var — 8080 only applies locally
const PORT = process.env.PORT || 8080;

// This file is the entry point for local dev and any traditional (non-Vercel)
// host — it's what keeps a real process alive for app.listen() and the
// node-cron schedule to work. Vercel never runs this file; it uses
// api/index.js instead, since serverless functions can't stay running.
const startServer = async () => {
  try {
    await connectDB();

    if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
      console.warn("WARNING: BREVO_API_KEY / EMAIL_FROM not set — inquiries will save, but no emails will be sent.");
    }

    startInquirySummaryJob();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
