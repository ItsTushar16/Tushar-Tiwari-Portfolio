const cron = require("node-cron");
const { runDailySummary } = require("../services/dailySummary");

// Only meaningful on a persistent server (local dev, Render, etc). Vercel
// serverless functions don't stay running, so this never fires there —
// Vercel uses its own Cron Jobs feature instead, hitting the /cron/daily-summary
// route defined in app.js.
const startInquirySummaryJob = () => {
  cron.schedule("0 9 * * *", async () => {
    try {
      console.log("Running daily inquiry summary...");
      const result = await runDailySummary();
      console.log(result.sent ? `Summary email sent (${result.count} inquiries)` : "No new inquiries in last 24 hours");
    } catch (err) {
      console.error("Cron error:", err.message);
    }
  });
};

module.exports = startInquirySummaryJob;
