const profileModel = require("../Models/profileModel");

const createProfile = async (req, res) => {
    try {
        const {name, email, status, bio} = req.body;

        profile = new profileModel({name, email, status, bio});

        await profile.save();

        res.status(200).json({_id: profile._id, name, email, status, bio});
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findProfile = async (req, res) => {
    try {
        const {email} = req.body;

        let profile = await profileModel.findOne({email});

        if(!profile) return res.status(400).json("Profile does not exist");

        res.status(200).json({name: profile.name, email, status: profile.status, bio: profile.bio});

    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findProfilesByName = async (req, res) => {
    try {
        const {name} = req.body;

        let profiles = await profileModel.find({name});

        if(!profiles) return res.status(400).json("No Profiles named " + name);

        res.status(200).json(profiles);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getProfiles = async(req, res) => {
    try {
        const profiles = await profileModel.find();

        res.status(200).json(profiles);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createProfile, findProfile, findProfilesByName, getProfiles};