const { Router } = require("express");
const router = Router();
const ctrlAuth = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema, refreshSchema } = require("../../models/user");

router.post("/register", validateBody(registerSchema), ctrlAuth.register);

router.post("/login", validateBody(loginSchema), ctrlAuth.login);

router.get("/current", authenticate, ctrlAuth.getCurrent);

router.post("/refresh", validateBody(refreshSchema), ctrlAuth.refresh);

router.get("/logout", authenticate, ctrlAuth.logout);

module.exports = router;
