const { body, validationResult } = require("express-validator");

const validateInquiry = [
  // .isString() on every field matters more than it looks: without it, a
  // payload like {"email": {"$gt": ""}} would sail past a plain isEmail()
  // check and reach the database as an object instead of a string.
  body("name")
    .isString()
    .withMessage("Name is required")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name is too long"),

  body("phone")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Phone must be 10 digits")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 digits")
    .isNumeric()
    .withMessage("Phone must contain only digits"),

  body("email")
    .isString()
    .withMessage("Valid email required")
    .trim()
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail(),

  body("message")
    .isString()
    .withMessage("Message is required")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 2000 })
    .withMessage("Message is too long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // only send back the message + field name, never echo the submitted value
      return res.status(400).json({ errors: errors.array().map(({ msg, path }) => ({ msg, path })) });
    }
    next();
  },
];

module.exports = validateInquiry;
