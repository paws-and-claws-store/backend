const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL, RESET_PASSWORD_KEY } = process.env;

const reset = async (req, res) => {
  const { resetPasswordToken } = req.params;

  const user = await User.findOne({ resetPasswordToken });

  if (!user) {
    throw HttpError(400, "User not found");
  }

  res.render("resetPassword");
};

module.exports = reset;
