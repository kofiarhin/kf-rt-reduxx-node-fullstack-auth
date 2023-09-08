const { Router } = require("express");
const {
  getUsers,
  createUser,
  clearUsers,
  loginUser,
  logoutUser,
  getProfile,
  getUser,
} = require("../Controllers/userController");
const { auth } = require("../middleware/auth");

const router = Router();

// get users
router.get("/", auth, getUsers);
router.post("/", createUser);
router.get("/profile", auth, getProfile);
router.get("/:id", auth, getUser);
router.delete("/", clearUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
module.exports = router;
