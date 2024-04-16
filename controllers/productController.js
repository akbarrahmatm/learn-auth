const listProduct = async (req, res, next) => {
  try {
    res.render("product/index");
  } catch (err) {
    res.render("error", {
      message: err.message,
    });
  }
};

module.exports = {
  listProduct,
};
