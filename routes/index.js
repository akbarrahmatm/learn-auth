const router = require("express").Router();

const productRouter = require("./productRouter");
const authRouter = require("./authRouter");

router.use("/product", productRouter);
router.use("/api/v1/auth", authRouter);

module.exports = router;
