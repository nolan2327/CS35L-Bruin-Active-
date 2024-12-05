const calendar = require("../Models/calendarModel");
const { exec } = require('child_process');

const runPythonScript = (pythonExecutable, scriptPath) => {
    return new Promise((resolve, reject) => {
        exec(`${pythonExecutable} ${scriptPath}`, (err, stdout, stderr) => {
            if (err) {
                console.log(`Error in executing script: ${stderr}`);
                reject(`Error in selenium script: ${stderr}`);
            }
            console.log(`Script executed successfully: ${stdout}`);
            resolve(stdout);  // Resolve promise when script is successful
        });
    });
};

const getAllData = async (req, res) => {
    try {
        // Calendar Pulls
        const pythonExecutable = '../env/bin/python3';  // Path to Python in the virtual environment
        const calendar_script_path = '../backend/selenium_scripts/calendar_script.py';  // Path to your Python script

        await Promise.all([
            runPythonScript(pythonExecutable, calendar_script_path),
        ]);

        let calendar_data;

        try {
            calendar_data = await calendar.find();
        } catch (err) {
            console.error("Error retrieving calendar data:", err);
            calendar_data = [];
        }

        res.status(200).json({
            calendar_data: calendar_data
        });
    } catch (err) {
        res.status(500).json({ message: "Error processing Calendar data", error: err });
    }
}

// Need to encode / as %2F
const findEventsByDate = async (req, res) => {
    try {
        const { start_date } = req.params;
        if (!start_date) {
            return res.status(400).json({ error: 'start_date parameter is required' });
        }

        let start_dates = await calendar.find({
            start_date: { $regex: start_date, $options: 'i' } // 'i' for case-insensitive matching
        });

        if (start_dates.length == 0) {
            return res.status(400).json("No events on " + start_date);
        }

        res.status(200).json(start_dates);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { getAllData, findEventsByDate };

