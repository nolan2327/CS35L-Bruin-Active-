const {Bfit, Wooden} = require("../Models/gymModel");
const { exec } = require('child_process');
const path = require('path');
const { stdout } = require("process");

// Return out Gym Data From a Post Request
const getAllData = async (req, res) => {
    try {
        // BFit Pull
        exec('python3 backend/selenium_scripts/bfit_pull.py', (err, stdout, stderr) => {
            if (err) {
                console.log(`Error in selenium script ${stderr}`)
                return res.status(500).json({ message: "Error executing Selenium script", error: stderr });
            }
            console.log("Successfully ran Bfit selenium script")

            const BFit_data = JSON.parse(stdout)

            Bfit.deleteMany({}, (err) => {
                if (err) {
                    console.log(`Error in clearing Bfit data ${err}`)
                }
                Bfit.insertMany(BFit_data, (err) => {
                    if (err) {
                        console.log(`Error in inserting into Bfit model ${err}`)
                        return res.status(500).json({ message: "Error inserting Bfit data", error: err });
                    }
                    console.log("Successfully inserted into Bfit data into MongoDB.")
                })
            })
        })
        // Wooden Pull
        exec('python3 backend/selenium_scripts/wooden_pull.py', (err, stdout, stderr) => {
            if (err) {
                console.log(`Error in selenium script ${stderr}`)
                return res.status(500).json({ message: "Error executing Selenium script", error: stderr });
            }
            console.log("Successfully ran Wooden selenium script")

            const Wooden_data = JSON.parse(stdout)

            Wooden.deleteMany({}, (err) => {
                if (err) {
                    console.log(`Error in clearing Wooden data ${err}`)
                    return
                }
                Wooden.insertMany(Wooden_data, (err) => {
                    if (err) {
                        console.log(`Error in inserting into Wooden model ${err}`)
                        return res.status(500).json({ message: "Error inserting Wooden data", error: err });
                    }
                    console.log("Successfully inserted Wooden data into MongoDB.")
                    res.status(200).json({ bfit: BFit_data, wooden: Wooden_data });
                })
            })
        })
    } catch (err) {
        res.status(500).json({ message: "Error processing gym data", error: err });
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