const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = "mongodb+srv://bruinactiveadmin:UoGCwIENUOywpaq6@bruinactivecluster.yi8fe.mongodb.net/Bruin-Active?retryWrites=true&w=majority&appName=BruinActiveCluster"

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB()

module.exports = connectDB;
