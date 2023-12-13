const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "5m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });

  newUser.accessToken = accessToken;
  newUser.refreshToken = refreshToken;

  newUser.save();

  res.status(201).json({
    code: 201,
    data: {
      user: {
        name,
        email,
        accessToken,
        refreshToken,
      },
    },
  });
};

module.exports = register;
