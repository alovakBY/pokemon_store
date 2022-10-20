const express = require("express");
const router = express.Router();

const ProductsService = require("../services/products.service");

router.use("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await ProductsService.getProduct(productId);

    res.send(product);
  } catch (err) {
    res.status(403).send({
      code: 403,
      message: err.message,
    });
  } finally {
    res.end();
  }
});

router.use("/", async (req, res) => {
  try {
    const { page, limit } = req.query;

    const products = await ProductsService.getAllProducts(+page, +limit);

    res.send(products);
  } catch (err) {
    res.status(403).send({
      code: 403,
      message: err.message,
    });
  } finally {
    res.end();
  }
});

module.exports = router;
