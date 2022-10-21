const express = require("express");
const jwt = require("jsonwebtoken");
const СartService = require("../services/cart.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    const { id } = await jwt.decode(token);

    const cart = await СartService.getCart(id);

    if (!cart) {
      throw new Error("Cart not found");
    }

    res.send(cart);
  } catch (err) {
    res.status(403).send({
      code: 403,
      message: err.message,
    });
  } finally {
    res.end();
  }
});

router.post("/item", async (req, res) => {
  try {
    console.log(req.body);
    const token = req.headers?.authorization?.split(" ")[1];
    const { id } = await jwt.decode(token);

    const cart = СartService.setCartItem(req.body, id);
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
