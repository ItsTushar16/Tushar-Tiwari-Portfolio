const Inquiry = require("../models/inquiry");
const { sendAdminSummary } = require("./emailService");

// Returns how many inquiries the summary covered, so callers (cron job or
// HTTP route) can report something meaningful back.
const runDailySummary = async () => {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const inquiries = await Inquiry.find({ createdAt: { $gte: last24Hours } });

  if (inquiries.length === 0) {
    return { sent: false, count: 0 };
  }

  await sendAdminSummary(inquiries);
  return { sent: true, count: inquiries.length };
};

module.exports = { runDailySummary };
