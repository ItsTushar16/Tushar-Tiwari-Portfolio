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


const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 200,
  keyGenerator: () => "global-day",
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});


router.post("/", ipLimiter, ...validateInquiry, emailLimiter, globalLimiter, dailyLimiter, inquiryController);

module.exports = router;
