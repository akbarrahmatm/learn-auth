const router = require("express").Router();

const authRouter = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

router.route("/register").post(authRouter.register);
router.route("/login").post(authRouter.login);
router.route("/me").get(authenticate, authRouter.authenticate);

module.exports = router;
