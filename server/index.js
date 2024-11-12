const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
<<<<<<< HEAD
const userRoute = require("./Routes/userRoute");
=======
const userRoute = require("./Routes/userRoute")
const { MongoClient } = require("mongodb");
>>>>>>> bdd2a74 (fixed mongo connection problem)

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
<<<<<<< HEAD
    res.send("Welcome to bruin active");
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
=======
  res.send("welcome to Bruin Active Server");
});

const port = process.env.PORT || 5000;

// const uri = 'mongodb+srv://bruinactiveadmin:UoGCwIENUOywpaq6@bruinactivecluster.yi8fe.mongodb.net/?retryWrites=true&w=majority&appName=BruinActiveCluster&tls=true';
// const uri = 'mongodb+srv://bruinactiveadmin:UoGCwIENUOywpaq6@bruinactivecluster.yi8fe.mongodb.net/?retryWrites=true&w=majority'
const uri = "mongodb+srv://bruinactiveadmin:UoGCwIENUOywpaq6@bruinactivecluster.yi8fe.mongodb.net/?retryWrites=true&w=majority"

>>>>>>> bdd2a74 (fixed mongo connection problem)
console.log(uri);
app.listen(port, (req, res) => {
    console.log('Server running on port: ${port}');
});

<<<<<<< HEAD
mongoose.connect(uri).then(() => console.log("Connected")).catch((error) => console.log("Connectiong Failed: ", error.message));
=======
// const client = new MongoClient(uri);

// client.connect().then(() => console.log("Connected")).catch((error) => console.log("No Connected"));

// client.close();

// mongoose.set('debug', true);

mongoose.connect(uri)
.then(() => console.log("MongoDB connection established"))
.catch((error) => console.log("MongoDB connection failed: ", error.message));

// const { MongoClient } = require("mongodb");

// async function run() {

//   const uri = "mongodb+srv://bruinactiveadmin:UoGCwIENUOywpaq6@bruinactivecluster.yi8fe.mongodb.net/?retryWrites=true&w=majority"

//   const client = new MongoClient(uri);

//   await client.connect().then(() => console.log("Connected")).catch((error) => console.log("No Connected"));

//   await client.close();
// }
// run().catch(console.dir);
>>>>>>> bdd2a74 (fixed mongo connection problem)
