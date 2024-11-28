const {Bfit, Wooden} = require("../Models/gymModel");
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

        console.log("Successfully ran both Selenium scripts");

        // Now retrieve the data from the database
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

        console.log('Bfit model:', BFit_data);
        console.log('Wooden model:', Wooden_data);

        // Send the response with the retrieved data
        res.status(200).json({
            bfit: BFit_data,
            wooden: Wooden_data
        });

    } catch (err) {
        console.error("Error processing gym data:", err);
        res.status(500).json({ message: "Error processing gym data", error: err });
    }
};

const findTotal = async(req, res) => {
    try {
        let BFit_data = await Bfit.find();
        let Wooden_data = await Wooden.find();
    
        const BFit_zones = BFit_data.filter(entry => entry.hasOwnProperty('place_name'));
        const Wooden_zones = Wooden_data.filter(entry => entry.hasOwnProperty('place_name'));
    
        let BFit_occupancy = 0;
        let BFit_total = 0;
        let Wooden_occupancy = 0;
        let Wooden_total = 0;
    
        for (const zones of BFit_zones) {
            let count = zones.last_count ? Number(zones.last_count) : 0;
            let percentage = zones.percentage ? Number(zones.percentage) : 0;
            BFit_occupancy += count;
            if (percentage !== 0) {
                BFit_total += count / percentage;
            }
        }
    
        for (const zones of Wooden_zones) {
            let count =  Number(zones.last_count);
            let percentage = Number(zones.percentage);
            Wooden_occupancy += count;
            Wooden_total += count / percentage;
        }

        res.status(200).json({
            bfit: {
              occupancy: BFit_occupancy,
              total: BFit_total
            },
            wooden: {
              occupancy: Wooden_occupancy,
              total: Wooden_total
            }
          });
        } catch (err) {
            res.status(500).json({ message: "Error calculating totals", error: err });
    }
}


// Intended to be in response to a request to read a specific gym's data
const findGym = async(req, res) => {
    // Adjust depending on what frontend code is but just go on basis that name corresponds to BFit or Wooden
    const { gymName } = req.params;  // Expecting a param like 'bfit' or 'wooden'

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

module.exports = {getAllData, findGym};