const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { user } = req;

  user.accessToken = "";
  user.refreshToken = "";

  await user.save();

  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
