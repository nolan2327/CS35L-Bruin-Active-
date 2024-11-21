const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema(
    {
        start_date: { type: String, required: true, minlength: 0, maxlength: 50},
        end_date: { type: String, required: true, minlength: 0, maxlength: 50},
        title: { type: String, required: true, minlength: 0 , maxlength: 500},
        location: { type: String, required: false, minlength: 0, maxlength: 500},
        description: { type: String, required: true, minlength: 0, maxlength: 500},
    }
);

const calendarModel = mongoose.model("Calendar", calendarSchema);

module.exports = calendarModel;
