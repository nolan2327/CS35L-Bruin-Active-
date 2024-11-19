const gymModel = require("../Models/gymModel");

const findOccupancy = async(req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {findOccupancy};


// const findUser = async(req, res) => {
//     const userId = req.params.userId;

//     try {
//         const user = await userModel.findById(userId);

//         res.status(200).json(user);
//     } catch(error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// };