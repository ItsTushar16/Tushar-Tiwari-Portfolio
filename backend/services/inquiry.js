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

try {
  console.log("Attempting to send confirmation email...");
  await sendUserConfirmation(savedInquiry);
  console.log("Confirmation email sent successfully.");
} catch (err) {
  console.error("Production email failure:", err.message);
}

return savedInquiry;
};

module.exports = { createInquiry };
