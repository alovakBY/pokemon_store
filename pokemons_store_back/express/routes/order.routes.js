/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - createdAt
 *         - totalPrice
 *         - itemsList
 *       properties:
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Created at order
 *         totalPrice:
 *           type: number
 *           description: Total price order
 *         itemsList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: orders API
 * /order:
 *   get:
 *     summary: get orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 *       403:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               enum:
 *                 - Orders not found
 *       500:
 *         description: Sever Error
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: orders API
 * /order:
 *   post:
 *     summary: set order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               totalPrice:
 *                 type: number
 *               itemsList:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customerId:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderItem'
 *       403:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               enum:
 *                 - Orders not found
 *       500:
 *         description: Sever Error
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const OrderService = require("../services/order.service");
const CartService = require("../services/cart.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    const { id } = jwt.decode(token);

    const { orders } = await OrderService.getOrders(id);

    if (!orders) {
      throw new Error("Orders not found");
    }

    res.send(orders);
  } catch (err) {
    res.status(403).send({
      code: 403,
      message: err.message,
    });
  } finally {
    res.end();
  }
});

router.post("/", async (req, res) => {
  try {
    const order = await OrderService.setOrder(req.body);

    if (!order) {
      throw new Error("Error place order");
    }

    await CartService.clearCart(req.body.customerId);

    res.send(order);
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
