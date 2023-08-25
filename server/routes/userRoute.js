const express = require("express");
const router = express.Router();

const UserController = require("../service/userService");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", UserController.createUser);

// router.post("/login", UserController.userLogin);

router.put("/:id", UserController.updateUser);

// router.delete("/:id", checkAuth, UserController.deleteUser);

module.exports = router;