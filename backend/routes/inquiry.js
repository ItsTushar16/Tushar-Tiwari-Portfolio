const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const validateInquiry = require("../middlewares/inquiryValidation");
const inquiryController = require("../controllers/inquiry");

// Layer 1 — per visitor (IP). A real person submits once, maybe twice.
const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// Layer 2 — per recipient address. The confirmation email goes to whatever
// address the visitor typed, so without this a bot (or a person with a grudge)
// could use your form to spam someone else's inbox from many different IPs.
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => `email:${req.body.email}`,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "You've already messaged me a few times recently. Please wait a while before sending another." },
});

// Layer 3 — global ceiling. Caps total database writes and outgoing emails per
// hour no matter how many IPs/addresses an attacker rotates through.
const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  keyGenerator: () => "global",
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// Layer 4 — daily ceiling. Brevo's free plan allows 300 emails per day, and your
// 9am summary email needs to fit inside that too, so stop well short of it.
const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 200,
  keyGenerator: () => "global-day",
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// Order matters: cheap checks first, and the email/global/daily limiters run
// after validation so only well-formed submissions count against them.
router.post("/", ipLimiter, ...validateInquiry, emailLimiter, globalLimiter, dailyLimiter, inquiryController);

module.exports = router;
