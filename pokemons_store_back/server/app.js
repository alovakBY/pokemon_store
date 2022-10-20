const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

const routes = require("./routes");

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// app.post("/pokemons", async (req, res) => {
//    console.log(req.body);
//    const pokemonsCollection = await dbo.setPokemons(req.body);
// });

// app.get("/products", async (req, res) => {
//    const { page, limit } = req.query;

//    const pokemonsCollection = await dbo.getPokemons(+page, +limit);

//    res.send(pokemonsCollection);
//    res.end();
// });

// app.post("/auth/signup", async (req, res) => {
//    // console.log(req.body);
//    const user = await dbo.setUser(req.body);

//    res.send(user);
//    res.end();
// });

// app.post("/auth/signin", async (req, res) => {
//    console.log(req);
//    const user = await dbo.getUser(req.body);

//    if (!user) {
//       res.status(403).send({
//          code: 403,
//          message: "User couldn't be found",
//       });
//       res.end();
//    } else {
//       res.send(user);
//       res.end();
//    }
// });
