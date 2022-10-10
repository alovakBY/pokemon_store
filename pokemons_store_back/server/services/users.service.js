const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

class UsersService {
   getUser = async (userData) => {
      try {
         await client.connect();

         console.log("connect to mongo");

         const dbo = await client.db("pokemonStore");

         const usersCollection = await dbo.collection("users");

         const user = await usersCollection.findOne(userData);

         return user;
      } catch (err) {
         console.log(err);
      } finally {
         await client.close();

         console.log("disconnect to mongo");
      }
   };

   setUser = async (userData) => {
      try {
         await client.connect();

         console.log("connect to mongo");

         const dbo = await client.db("pokemonStore");

         const collection = await dbo.collection("users");

         const isUserExists = await collection.findOne({
            email: userData.email,
         });

         if (isUserExists) {
            throw new Error("User already exists");
         } else {
            const { insertedId } = await collection.insertOne(userData);

            const user = await collection.findOne(insertedId);

            return user;
         }
      } finally {
         await client.close();

         console.log("disconnect to mongo");
      }
   };
}

module.exports = new UsersService();
