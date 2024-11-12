const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
<<<<<<< HEAD
        name: { type: String, required: true, minlength: 3, maxlength: 30},
        email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true},
        password: { type: String, required: true, minlength:3 , maxlength: 1024},
=======
        name: {type: String, required: true, minlength: 3, maxlength: 30},
        email: {type: String, required: true, minelength:3, maxlength: 200, unique: true},
        password: {type: String, required: true, minelength: 3, maxlength: 1024},
>>>>>>> bdd2a74 (fixed mongo connection problem)
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;