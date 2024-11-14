const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema( // not yet correct after this
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30},
        email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true},
        password: { type: String, required: true, minlength:3 , maxlength: 1024},
    },
    {
        timestamps: true,
    }
);

const gymModel = mongoose.model("Gym", gymSchema);

module.exports = gymModel;