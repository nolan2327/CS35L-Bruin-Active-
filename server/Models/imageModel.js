const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    username: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const imageModel = mongoose.model("Image", imageSchema);

module.exports = imageModel;