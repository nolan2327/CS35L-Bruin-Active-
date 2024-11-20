const calendarModelModel = require("../Models/calendarModel");

const findDatesByDate = async (req, res) => {
    try {
        const {start_date} = req.body;

        let start_dates = await calendarModelModel.find({start_dates});

        if(!start_dates) return res.status(400).json("No events on " + start_date);

        res.status(200).json(start_dates);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {findDatesByDate};