const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute")
const { MongoClient } = require("mongodb");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
    res.send("Welcome to bruin active");
});


const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

mongoose.connect(uri).then(() => console.log("Connected")).catch((error) => console.log("Connectiong Failed: ", error.message));