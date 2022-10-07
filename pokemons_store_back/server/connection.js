const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

let dbConnection;

module.exports = {
  setPokemons: async function (pokemonsData) {
    await client.connect();

    console.log("connect to mongo");

    dbConnection = await client.db("pokemonStore");

    const collection = await dbConnection.collection("pokemons");

    const pokemons = await collection.insertMany(pokemonsData);

    return pokemons;
  },

  getPokemons: async function (page, limit) {
    try {
      await client.connect();

      console.log("connect to mongo");

      dbConnection = await client.db("pokemonStore");

      const collection = await dbConnection.collection("pokemons");

      const pokemons = await collection
        .find()
        .skip((+page - 1) * +limit)
        .limit(+limit * +page)
        .toArray();

      return pokemons;
    } catch (e) {
      return e;
    }
  },

  setUser: async function (user) {
    try {
      await client.connect();

      console.log("connect to mongo ");

      dbConnection = await client.db("pokemonStore");

      const users_collection = dbConnection.collection("users");

      const finded_user = await users_collection.findOne({
        email: user.email,
        password: user.password,
      });

      console.log(finded_user);

      // const all_users = await dbConnection.collection("users");

      // const user = await collection.insertOne(user);

      // return user;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  getUser: async function ({ email, password }) {
    try {
      await client.connect();

      console.log("connect to mongo");

      dbConnection = await client.db("pokemonStore");

      const collection = await dbConnection.collection("users");

      const user = await collection.findOne({ email, password });

      console.log(user);

      return user;
    } catch (e) {
      return e;
    }
  },

  closeDb: () => {
    client.close();
  },
};
