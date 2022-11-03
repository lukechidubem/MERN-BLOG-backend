const router = require("express").Router();

const userController = require("../controller/userController");

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
// router.get("/user", userController.authMiddleware, userController.getUser2);
router.get("/profile", userController.getUser);

module.exports = router;
