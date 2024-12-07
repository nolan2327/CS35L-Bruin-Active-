const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Function to connect to the MongoDB database in the index.js file
const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('MongoDB Connection Error: ', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
