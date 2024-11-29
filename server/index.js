const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes
const userRoute = require("./Routes/userRoute");
const gymRoute = require("./Routes/gymRoute");
const profileRoute = require("./Routes/profileRoute");
const calendarRoute = require("./Routes/calendarRoute");
const imageRoute = require("./Routes/imageRoute");

const connectDB = require("./Config/db");
// const { MongoClient } = require("mongodb");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/gym", gymRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/calendar", calendarRoute);
app.use("/api/image", imageRoute);

const port = process.env.PORT || 5000; // Uses port 5000 unless other port is given, don't add port to .env file
const uri = process.env.ATLAS_URI;

app.listen(port, () => {
    console.log(`Server connecting on port: ${port}`);
});

connectDB(uri);
// mongoose.connect(uri).then(() => console.log("Connected")).catch((error) => console.log("Connectiong Failed: ", error.message));