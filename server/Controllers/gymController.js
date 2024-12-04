const { Bfit, Wooden } = require("../Models/gymModel");
const { exec } = require('child_process');

// Helper function to run Python script and return a promise
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
        // BFit Pull
        const pythonExecutable = '../env/bin/python3';  // Path to Python in the virtual environment
        const bfit_script_path = '../backend/selenium_scripts/bfit_pull.py';  // Path to your Python script
        const wooden_script_path = '../backend/selenium_scripts/wooden_pull.py';  // Path to Wooden Python script

        // Run both Python scripts concurrently
        await Promise.all([
            runPythonScript(pythonExecutable, bfit_script_path),
            runPythonScript(pythonExecutable, wooden_script_path)
        ]);

        // Retrieve the data from the database
        let BFit_data, Wooden_data;

        try {
            BFit_data = await Bfit.find();
        } catch (err) {
            console.error("Error retrieving BFit data:", err);
            BFit_data = [];  // Ensure we don't break the response
        }

        try {
            Wooden_data = await Wooden.find();
        } catch (err) {
            console.error("Error retrieving Wooden data:", err);
            Wooden_data = [];  // Ensure we don't break the response
        }

        // Calculate totals and occupancy
        let BFit_occupancy = 0;
        let BFit_total = 0;
        let Wooden_occupancy = 0;
        let Wooden_total = 0;

        BFit_data.forEach(entry => {
            entry.zones.forEach((zone) => {
                let count = zone.last_count ? Number(zone.last_count) : 0;
                let percentage = zone.percentage ? parseFloat(zone.percentage.replace('%', '')) : 0;
                BFit_total += count;
                if (percentage !== 0) {
                    BFit_occupancy += Math.floor(count / (percentage / 100));
                }
            });
        });

        Wooden_data.forEach(entry => {
            entry.zones.forEach((zone) => {
                let count = zone.last_count ? Number(zone.last_count) : 0;
                let percentage = zone.percentage ? parseFloat(zone.percentage.replace('%', '')) : 0;
                Wooden_total += count;
                if (percentage !== 0) {
                    Wooden_occupancy += Math.floor(count / (percentage / 100));
                }
            });
        });

        res.status(200).json({
            bfit: {
                data: BFit_data,
                total: BFit_total,
                occupancy: BFit_occupancy
            },
            wooden: {
                data: Wooden_data,
                total: Wooden_total,
                occupancy: Wooden_occupancy
            }
        });

    } catch (err) {
        console.error("Error processing gym data:", err);
        res.status(500).json({ message: "Error processing gym data", error: err });
    }
};

// Intended to be in response to a request to read a specific gym's data
const findGym = async (req, res) => {
    // Adjust depending on what frontend code is but just go on basis that name corresponds to BFit or Wooden
    const { gymName } = req.params;  // Expecting a param like 'bfit' or 'wooden'

    if (!gymName) {
        return res.status(400).json({ message: "Gym type is required" });
    }

    try {
        let gymData;
        if (gymName.toLowerCase() == 'bfit') {
            gymData = await Bfit.find()
        }
        else if (gymName.toLowerCase() == 'wooden') {
            gymData = await Wooden.find()
        }
        else {
            return res.status(400).json({ message: "Invalid gym name" });
        }

        res.status(200).json(gymData);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving gym data", error: err });
    }
}

module.exports = { getAllData, findGym };