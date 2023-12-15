const { Router } = require("express");
const router = Router();
const ctrlAuth = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema, refreshSchema, emailSchema } = require("../../models/user");
const auth = require("../../controllers/auth");

router.post("/register", validateBody(registerSchema), ctrlAuth.register);

router.post("/login", validateBody(loginSchema), ctrlAuth.login);

router.get("/current", authenticate, ctrlAuth.getCurrent);

router.post("/refresh", validateBody(refreshSchema), ctrlAuth.refresh);

router.get("/logout", authenticate, ctrlAuth.logout);

router.get("/verify/:verificationCode", ctrlAuth.verifyEmail);

router.post("/verify", validateBody(emailSchema), auth.resendVerifyEmail);

module.exports = router;
