/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - id
 *         - image
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         id:
 *           type: number
 *           description: cart item ID
 *         image:
 *           type: string
 *           description: image url
 *         name:
 *           type: string
 *           description: item name
 *         price:
 *           type: number
 *           description: item price
 *         quantity:
 *           type: number
 *           description: item quantity
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartResponse:
 *       type: object
 *       required:
 *         - _id
 *         - customerId
 *         - quantity
 *         - totalPrice
 *         - itemsList
 *       properties:
 *         _id:
 *           type: string
 *           description: cart ID
 *         customerId:
 *           type: string
 *           description: customer ID
 *         quantity:
 *           type: number
 *           description: cart quantity
 *         totalPrice:
 *           type: number
 *           description: total price
 *         itemsList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *           description: items in cart
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: cart API
 * /cart:
 *   get:
 *     summary: get cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       403:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               enum:
 *                 - Cart not found
 *       500:
 *         description: Sever Error
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: cart API
 * /cart/item:
 *   post:
 *     summary: add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       403:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Sever Error
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: cart API
 * /cart/item:
 *   patch:
 *     summary: change item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartState:
 *                   type: object
 *                   properties:
 *                     quantity:
 *                       type: number
 *                     totalPrice:
 *                       type: number
 *                 updatedItem:
 *                   $ref: '#/components/schemas/CartItem'
 *       403:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Sever Error
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: delete item
 * /cart/item/{id}:
 *   delete:
 *     summary: delete item to cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartState:
 *                   type: object
 *                   properties:
 *                     quantity:
 *                       type: number
 *                     totalPrice:
 *                       type: number
 *                 removedItemId:
 *                   type: number
 *       403:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Sever Error
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const СartService = require("../services/cart.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    const { id } = jwt.decode(token);

    const cart = await СartService.getCart(id);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const resData = cart.itemsList.reduce(
      (acc, item) => {
        return {
          ...acc,
          quantity: acc.quantity + item.quantity,
          totalPrice: acc.totalPrice + item.price * item.quantity,
        };
      },
      { ...cart, quantity: 0, totalPrice: 0 },
    );

    res.send(resData);
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
  const {id, image, name, price, quantity} = req.body

  if (!id || !image || !name || !price || !quantity) {

    res.status(400).send({
      code: 400,
      message: "bad request",
    });

    res.end();
    return;
  }

  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const { id } = jwt.decode(token);

    const cart = await СartService.setCartItem(req.body, id);

    const resData = cart.itemsList.reduce(
      (acc, item) => {
        return {
          ...acc,
          quantity: acc.quantity + item.quantity,
          totalPrice: acc.totalPrice + item.price * item.quantity,
        };
      },
      { ...cart, quantity: 0, totalPrice: 0 },
    );

    res.send(resData);
  } catch (err) {
    res.status(403).send({
      code: 403,
      message: err.message,
    });
  } finally {
    res.end();
  }
});

router.patch("/item", async (req, res) => {
  if (!('id' in req.body) || !('quantity' in req.body)) {

    res.status(400).send({
      code: 400,
      message: "bad request",
    });

    res.end();
    return;
  }

  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const { id } = jwt.decode(token);

    const cart = await СartService.updateCartItem(req.body, id);

    const resData = cart.itemsList.reduce(
      (acc, item) => {
        return {
          ...acc,
          quantity: acc.quantity + item.quantity,
          totalPrice: acc.totalPrice + item.price * item.quantity,
        };
      },
      { quantity: 0, totalPrice: 0 },
    );

    const updatedItem = cart.itemsList.find((item) => item.id === req.body.id);

    res.send({ updatedItem, cartState: resData });
  } catch (err) {
    res.status(403).send({
      code: 403,
      message: err.message,
    });
  } finally {
    res.end();
  }
});

router.delete("/item/:id", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const { id } = jwt.decode(token);
    const itemId = +req.params.id;

    const cart = await СartService.deleteCartItem(itemId, id);

    const resData = cart.itemsList.reduce(
      (acc, item) => {
        return {
          ...acc,
          quantity: acc.quantity + item.quantity,
          totalPrice: acc.totalPrice + item.price * item.quantity,
        };
      },
      { quantity: 0, totalPrice: 0 },
    );

    res.send({ removedItemId: itemId, cartState: resData });
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
