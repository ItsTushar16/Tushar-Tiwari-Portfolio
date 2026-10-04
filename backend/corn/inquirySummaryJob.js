const cron = require("node-cron");
const { runDailySummary } = require("../services/dailySummary");


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
