const Inquiry = require("../models/inquiry");
const { sendUserConfirmation } = require("./emailService");

const createInquiry = async (data) => {
  const { name, email, phone, message } = data;

  const newInquiry = new Inquiry({
    name,
    email,
    phone,
    message,
  });

  const savedInquiry = await newInquiry.save();

  // Send email
  sendUserConfirmation(savedInquiry).catch((err) =>
    console.error("Email failed:", err.message)
  );

  return savedInquiry;
};

module.exports = { createInquiry };
