const { Router } = require("express");
const router = Router();
const ctrlAuth = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { registerSchema } = require("../../models/user");
const consts = require("../../config/consts");

router.post("/register", validateBody(registerSchema), ctrlAuth.register);

module.exports = router;
