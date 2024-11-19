const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30},
        email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true},
        status: { type: String, required: true, minlength: 0, maxlength: 30},
        bio: { type: String, required: true, minlength: 0, maxlength: 500},
    },
    {
        timestamps: true,
    }
);

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;