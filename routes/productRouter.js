const router = require("express").Router();

const productController = require("../controllers/productController");

router.route("/").get(productController.listProduct);

module.exports = router;
