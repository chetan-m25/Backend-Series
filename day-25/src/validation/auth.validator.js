import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

export const registerValidator = [
  body("username").isString().withMessage("Username should be String"),
  body("email").isEmail().withMessage("Email should be valid"),
  body("password")
    .custom((value) => {
      if (value.length < 6 || value.length > 12) {
        throw new Error("Password should be between 6 and 12 characters long");
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        throw new Error(
          "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        );
      }
      return true;
    })
    .withMessage("Invalid Password"),
  validate,
];
