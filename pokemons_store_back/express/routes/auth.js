/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: user ID
 *         accessToken:
 *           type: string
 *           description: access token
 *         email:
 *           type: string
 *           description: user email
 *         password:
 *           type: string
 *           description: user password
 *         phone:
 *           type: string
 *           description: user phone
 *         firstName:
 *           type: string
 *           description: user first name
 *         lastName:
 *           type: string
 *           description: user last name
 *         gender:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *           description: user gender
 *         address:
 *           type: object
 *           properties:
 *             addressLine1:
 *               type: string
 *               description: address line 1
 *             addressLine2:
 *               type: string
 *               description: address line 2
 *             country:
 *               type: string
 *               description: user country
 *             city:
 *               type: string
 *               description: user city
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignIn:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: user email
 *         password:
 *           type: string
 *           description: user password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         email:
 *           type: string
 *           description: user email
 *         password:
 *           type: string
 *           description: user password
 *         phone:
 *           type: string
 *           description: user phone
 *         firstName:
 *           type: string
 *           description: user first name
 *         lastName:
 *           type: string
 *           description: user last name
 *         gender:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *           description: user gender
 *         address:
 *           type: object
 *           properties:
 *             addressLine1:
 *               type: string
 *               description: address line 1
 *             addressLine2:
 *               type: string
 *               description: address line 2
 *             country:
 *               type: string
 *               description: user country
 *             city:
 *               type: string
 *               description: user city
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: auth API
 * /auth/signIn:
 *   post:
 *     summary: sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               enum:
 *                 - User couldn't be found
 *       500:
 *         description: Sever Error
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: auth API
 * /auth/signUp:
 *   post:
 *     summary: sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                   enum:
 *                     - true
 *                 message:
 *                   type: string
 *                   enum:
 *                    - success
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 -
 *       500:
 *         description: Some server error
 */

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const AuthService = require("../services/users.service");

router.post("/signIn", async (req, res) => {
  const user = await AuthService.getUser(req.body);
  if (!user) {
    res.status(403).send({
      code: 403,
      message: "User couldn't be found",
    });
  } else {
    const token = jwt.sign(
      { email: user.email, password: user.password, id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      },
    );

    res.send({
      accessToken: token,
      ...user,
    });
  }

  res.end();
});

router.post("/signUp", async (req, res) => {
  const userData = req.body;

  if (!userData.email) {
    req.status(400).send({
      code: 400,
      message: "email is required field",
    });
    res.end();
    return;
  }

  if (!userData.password) {
    req.status(400).send({
      code: 400,
      message: "password is required field",
    });
    res.end();
    return;
  }

  if (!userData.phone) {
    req.status(400).send({
      code: 400,
      message: "phone is required field",
    });
    res.end();
    return;
  }

  try {
    const user = await AuthService.setUser(req.body);

    res.send({
      email: user.email,
      password: user.password,
      success: true,
      message: "success",
    });
  } catch (err) {
    res.status(400).send({
      code: 400,
      message: err.message,
    });
  } finally {
    res.end();
  }
});

module.exports = router;
