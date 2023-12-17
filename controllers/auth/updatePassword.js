const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL, RESET_PASSWORD_KEY } = process.env;

const updatePassword = (req, res) => {
  const { password } = req.body;
};
