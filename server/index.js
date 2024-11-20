const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
// const gymRoute = require("./Routes/gymRoute");
const profileRoute = require("./Routes/profileRoute");
const calendarRoute = require("./Routes/calendarRoute");
const db = require("./Config/db");
const connectDB = require("./Config/db");
// const { MongoClient } = require("mongodb");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
// app.use("api/gym", gymRoute);
app.use("api/profiles", profileRoute);
app.use("api/calendar", calendarRoute);

app.get("/", (req, res) => {
    res.send("Welcome to bruin active");
});


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

connectDB(uri);
// mongoose.connect(uri).then(() => console.log("Connected")).catch((error) => console.log("Connectiong Failed: ", error.message));