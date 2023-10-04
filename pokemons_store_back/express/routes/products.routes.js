/**
 * @swagger
 * components:
 *   schemas:
 *     AbilityItem:
 *       type: object
 *       required:
 *         - description
 *         - title
 *       properties:
 *         description:
 *           type: string
 *           description: Ability description
 *         title:
 *           type: string
 *           description: Ability title
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StatItem:
 *       type: object
 *       required:
 *         - value
 *         - title
 *       properties:
 *         value:
 *           type: string
 *           description: Stat value
 *         title:
 *           type: string
 *           description: Stat title
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductItem:
 *       type: object
 *       required:
 *         - _id
 *         - id
 *         - image
 *         - name
 *         - price
 *         - abilities
 *         - stats
 *       properties:
 *         _id:
 *           type: string
 *           description: product _id
 *         id:
 *           type: string
 *           description: product id
 *         image:
 *           type: string
 *           description: product image url
 *         name:
 *           type: string
 *           description: product name
 *         price:
 *           type: number
 *           description: product price
 *         abilities:
 *           type: array
 *           description: product abilities
 *           items:
 *             $ref: '#/components/schemas/AbilityItem'
 *         stats:
 *           type: array
 *           description: product stats
 *           items:
 *             $ref: '#/components/schemas/StatItem'
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: products API
 * /products:
 *   get:
 *     summary: get products
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductItem'
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
 *   name: Products
 *   description: products API
 * /products/{id}:
 *   get:
 *     summary: get product
 *     tags: [Products]
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
 *               $ref: '#/components/schemas/ProductItem'
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
const router = express.Router();

const ProductsService = require("../services/products.service");

router.get("/:id", async (req, res) => {
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

router.get("/", async (req, res) => {
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
