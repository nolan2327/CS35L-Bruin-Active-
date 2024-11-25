const profileModel = require("../Models/profileModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey);
};

const createProfile = async (req, res) => {
    try {
        const {username, status, bio} = req.body;

        profile = new profileModel({username, status, bio});

        await profile.save();

        const token = createToken(profile._id);

        res.status(200).json({_id: profile._id, username, status, bio});
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findProfile = async (req, res) => {
    try {
        const {username} = req.body;

        let profile = await profileModel.findOne({username});

        if(!profile) return res.status(400).json("Profile does not exist");

        res.status(200).json({username, status: profile.status, bio: profile.bio});

    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findProfilesByName = async (req, res) => {
    try {
        const {username} = req.body;

        let profiles = await profileModel.find({username});

        if(!profiles) return res.status(400).json("No Profiles named " + username);

        res.status(200).json(profiles);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const changeStatus = async (req, res) => {
    try {
        const {username, newStatus} = req.body;

        let profile = await profileModel.findOneAndUpdate({username}, {status: newStatus}, {new: true});

        if(!profile) return res.status(400).json("Profile does not exist");

        res.status(200).json({username, status: profile.status, bio: profile.bio});

    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const changeBio = async (req, res) => {
    try {
        const {username, newBio} = req.body;

        let profile = await profileModel.findOneAndUpdate({username}, {bio: newBio}, {new: true});

        if(!profile) return res.status(400).json("Profile does not exist");

        res.status(200).json({username, status: profile.status, bio: profile.bio});

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

module.exports = {createProfile, findProfile, findProfilesByName, changeStatus, changeBio, getProfiles};