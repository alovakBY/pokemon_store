const express = require("express");
const router = express.Router();
const AuthService = require("../services/users.service");

router.use("/signIn", async (req, res) => {
  const user = await AuthService.getUser(req.body);

  if (!user) {
    res.status(403).send({
      code: 403,
      message: "User couldn't be found",
    });
  } else {
    res.send(user);
  }

  res.end();
});

// router.use("/signUp", async (req, res) => {
//   const user = await AuthService.getUser(req.body);

//   if (!user) {
//     res.status(403).send({
//       code: 403,
//       message: "User couldn't be found",
//     });
//   } else {
//     res.send(user);
//   }

//   res.end();
// });

module.exports = router;
