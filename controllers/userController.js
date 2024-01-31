const userServise = require("../servise/userServise");
const { ctrlErrorHandler } = require("../helpers");

class UserController {
  register = ctrlErrorHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const result = await userServise.register(name, email, password);

    console.log("result", result);

    res.status(201).json({
      code: 201,
      data: {
        user: {
          name,
          email,
          ...result,
        },
      },
    });
  });

  authGoogle = ctrlErrorHandler(async (req, res) => {
    const { _id } = req.user;

    await userServise.authGoogle(_id);

    res.redirect("https://paws-and-claws-store.github.io/frontend/user");
  });

  login = ctrlErrorHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await userServise.login(email, password);

    res.status(200).json({
      code: 200,
      data: {
        user: {
          ...result,
        },
      },
    });
  });

  logout = ctrlErrorHandler(async (req, res) => {
    const { user } = req;

    await userServise.logout(user);

    res.json({
      message: "Logout success",
    });
  });

  current = ctrlErrorHandler(async (req, res) => {
    const { email, name } = req.user;

    res.json({ name, email });
  });

  refresh = ctrlErrorHandler(async (req, res) => {
    const { refreshToken } = req.body;

    const result = await userServise.refresh(refreshToken);

    res.json({
      ...result,
    });
  });

  verifyEmail = ctrlErrorHandler(async (req, res) => {
    const { verificationCode } = req.params;

    await userServise.verifyEmail(verificationCode);

    res.redirect("https://paws-and-claws-store.github.io/frontend/user");
  });

  resendVerifyEmail = ctrlErrorHandler(async (req, res) => {
    const { email } = req.body;

    await userServise.resendVerifyEmail(email);

    res.status(200).json({
      code: 200,
      message: "Verification email sent",
    });
  });

  resetPassword = ctrlErrorHandler(async (req, res) => {
    const { email } = req.body;

    await userServise.resetPassword(email);

    res.json({
      message: "success",
    });
  });

  verifyResetToken = ctrlErrorHandler(async (req, res) => {
    const { resetPasswordToken } = req.body;

    await userServise.verifyResetToken(resetPasswordToken);

    res.json({
      message: "Success",
    });
  });

  updatePassword = ctrlErrorHandler(async (req, res) => {
    const { password, resetPasswordToken } = req.body;

    await userServise.updatePassword(password, resetPasswordToken);

    res.json({ message: "Password update success" });
  });
}

module.exports = new UserController();
