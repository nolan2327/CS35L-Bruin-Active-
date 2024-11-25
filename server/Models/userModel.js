const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, minlength: 3, maxlength: 30, unique: true},
        password: { type: String, required: true, minlength:3 , maxlength: 1024},
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;