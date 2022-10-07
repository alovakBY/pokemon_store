const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

class UsersService {
  getUser = async (userData) => {
    try {
      await client.connect();

      console.log("connect to Mongo");

      const dbo = await client.db("pokemonStore");

      const usersCollection = await dbo.collection("users");

      const user = await usersCollection.findOne(userData);

      return user;
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();

      console.log("disconnect to Mongo");
    }
  };
}

module.exports = new UsersService();
