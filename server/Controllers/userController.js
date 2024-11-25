const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey);
};

const registerUser = async (req, res) => {
    try{

        const {username, password} = req.body;

        let user = await userModel.findOne({username});

        if(user) return res.status(400).json("User with email already exists");

        if(!username || !password) return res.status(400).json("All fields are required");

        if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong");

        user = new userModel({username, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, username, token});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const loginUser = async(req, res) => {
    const {username, password} = req.body;

    try {
        let user = await userModel.findOne({username});

        if(!user) return res.status(400).json("Invalid email or password");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) return res.status(400).json("Invalid password");

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, username, token});
    } catch(error) {
        console.log(error)
        res.status(500).json(error);
    }
    
};

const findUser = async(req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getUsers = async(req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {registerUser, loginUser, findUser, getUsers};
