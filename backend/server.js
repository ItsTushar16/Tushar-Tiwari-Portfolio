require("dotenv").config();

const app = require("./expressApp");
const connectDB = require("./config/db");
const startInquirySummaryJob = require("./corn/inquirySummaryJob");

const PORT = process.env.PORT || 8080;


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
