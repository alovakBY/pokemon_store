const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

class CartService {
  getCart = async (cartId) => {
    try {
      await client.connect();

      console.log("connect to mongo");

      const dbo = await client.db("pokemonStore");

      const cartsCollection = await dbo.collection("carts");

      const cart = await cartsCollection.findOne({ _id: ObjectId(cartId) });

      return cart;
    } finally {
      client.close();

      console.log("disconnect to mongo");
    }
  };

  setCartItem = async (product, cartId) => {
    try {
      await client.connect();

      const dbo = await client.db("pokemonStore");

      const cartsCollection = await dbo.collection("carts");

      // const cart = await cartsCollection.updateOne(
      //   { _id: ObjectId(cartId) },
      //   {
      //     $: {
      //       itemsList: product,
      //     },
      //   }
      // );

      console.log("connect to mongo");
    } finally {
      client.close();

      console.log("disconnect to mongo");
    }
  };
}

module.exports = new CartService();
