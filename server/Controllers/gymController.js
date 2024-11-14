const gymModel = require("../Models/gymModel");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey);
};

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