const inquiryService = require("../services/inquiry");

const inquiryController = async (req, res) => {
  try {
    await inquiryService.createInquiry(req.body);

    res.status(201).json({
      success: true,
      message: "Inquiry saved",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = inquiryController;
