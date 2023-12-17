const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL, RESET_PASSWORD_KEY } = process.env;

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "User not found");
  }

  const payload = {
    id: user._id,
  };

  const resetPasswordToken = jwt.sign(payload, RESET_PASSWORD_KEY, { expiresIn: "7d" });

  user.resetPasswordToken = resetPasswordToken;

  await user.save();

  const resetPass = {
    to: email,
    subject: " Paws & Claws",
    html: `<p>Ура</p>`,
  };

  await sendEmail(resetPass);

  res.json({
    message: "success",
  });
};

module.exports = resetPassword;
