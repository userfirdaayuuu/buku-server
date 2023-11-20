const express = require("express");
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", authMiddleware, UserController.get);

module.exports = router;
