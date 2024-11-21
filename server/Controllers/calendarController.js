const calendar = require("../Models/calendarModel");
const { exec } = require('child_process');

const getAllData = async (req, res) => {
    try {
        // Calendar Pull
        exec('python3 backend/selenium_scripts/calendar_script.py', (err, stdout, stderr) => {
            if (err) {
                console.log(`Error in selenium script ${stderr}`)
                return res.status(500).json({ message: "Error executing Selenium script", error: stderr });
            }
            console.log("Successfully ran Calendar selenium script")

            const calendar_data = JSON.parse(stdout)

            Cale.deleteMany({}, (err) => {
                if (err) {
                    console.log(`Error in clearing Calendar data ${err}`)
                }
                Bfit.insertMany(calendar_data, (err) => {
                    if (err) {
                        console.log(`Error in inserting into Calendar model ${err}`)
                        return res.status(500).json({ message: "Error inserting Calendar data", error: err });
                    }
                    console.log("Successfully inserted into Calendar data into MongoDB.")
                })
            })
        })
    } catch (err) {
        res.status(500).json({ message: "Error processing Calendar data", error: err });
    }
}

const findEventsByDate = async (req, res) => {
    try {
        const {start_date} = req.body;

        let start_dates = await calendar.find({start_dates});

        if(!start_dates) return res.status(400).json("No events on " + start_date);

        res.status(200).json(start_dates);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {getAllData, findEventsByDate};