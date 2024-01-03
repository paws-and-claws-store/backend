const { Router } = require("express");
const router = Router();

const { validateBody, authenticate } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  emailSchema,
  resetPasswordSchema,
} = require("../../models/user");

const userController = require("../../controllers/userController");

router.post("/register", validateBody(registerSchema), userController.register);

router.post("/login", validateBody(loginSchema), userController.login);

router.get("/current", authenticate, userController.current);

router.post("/refresh", validateBody(refreshSchema), userController.refresh);

router.get("/logout", authenticate, userController.logout);

router.get("/verify/:verificationCode", userController.verifyEmail);

router.post("/verify", validateBody(emailSchema), userController.resendVerifyEmail);

router.post("/resetPassword", validateBody(emailSchema), userController.resetPassword);

router.post("/verifyResetToken", userController.verifyResetToken);

router.patch("/updatePassword", validateBody(resetPasswordSchema), userController.updatePassword);

module.exports = router;
