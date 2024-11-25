const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, minlength: 3, maxlength: 30, unique: true},
        status: { type: String, required: true, minlength: 0, maxlength: 30},
        bio: { type: String, required: true, minlength: 0, maxlength: 500},
    }
);

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;