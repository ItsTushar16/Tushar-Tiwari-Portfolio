const dns = require("node:dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { runDailySummary } = require("./services/dailySummary");

const app = express();

// Trust the platform's reverse proxy so req.ip is the visitor's real IP,
// not the proxy's. Required for rate-limiting to work correctly on
// Render/Vercel alike.
app.set("trust proxy", 1);

app.use(helmet());

// Only these origins may call the API. Comma-separate multiple values in
// FRONTEND_URL (e.g. your local dev server + your live frontend domain).
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    methods: ["GET", "POST"],
    maxAge: 600,
    origin: (origin, callback) => {
      // no origin = same-origin requests, curl, Postman, etc — allow those through
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      const err = new Error("Not allowed by CORS");
      err.status = 403;
      return callback(err);
    },
  })
);

app.use(express.json({ limit: "10kb" })); // small cap — a contact form has no business sending more

// health check — point an uptime monitor here to stop a free host from sleeping
app.get("/health", (req, res) => res.json({ status: "ok" }));

// routes
const inquiryRoutes = require("./routes/inquiry");
app.use("/inquiry", inquiryRoutes);

// Triggered on a schedule by Vercel Cron (see vercel.json) in production, or
// callable manually (e.g. for testing) wherever this app runs. Vercel signs
// its own cron requests with this exact header, which is why checking it is
// enough — no one else can guess CRON_SECRET.
app.get("/cron/daily-summary", async (req, res) => {
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const result = await runDailySummary();
    res.json({ ok: true, ...result });
  } catch (err) {
    console.error("Daily summary error:", err.message);
    res.status(500).json({ ok: false, message: "Summary failed" });
  }
});

// anything else is a 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error("Server Error:", err.stack);
  res.status(status).json({ message: status >= 500 ? "Something went wrong" : err.message });
});

module.exports = app;
