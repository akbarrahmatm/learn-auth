const router = require("express").Router();

const authRouter = require("../controllers/authController");

router.route("/register").post(authRouter.register);

module.exports = router;
