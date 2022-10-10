const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");

router.use((req, res, next) => {
   try {
      if (req.url.startsWith("/auth")) {
         next();
      } else {
         const token = req.headers?.authorization?.split(" ")[1];

         if (!token) {
            res.status(401).send({
               code: 401,
               message: "Not authorized",
            });

            res.end();

            return;
         }

         const jwtDecoded = jwt.decode(token);

         if (jwtDecoded.exp * 1000 < new Date().getTime()) {
            res.status(401).send({
               code: 401,
               message: "Not authorized",
            });

            res.end();

            return;
         }

         next();
      }
   } catch (err) {
      res.status(401).send({
         code: 401,
         message: "Not authorized",
      });
   }
});

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);

module.exports = router;
