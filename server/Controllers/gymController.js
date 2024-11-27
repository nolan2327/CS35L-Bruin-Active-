const {Bfit, Wooden} = require("../Models/gymModel");
const { exec } = require('child_process');

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

module.exports = {getAllData, findTotal, findGym};