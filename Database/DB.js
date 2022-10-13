const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(
            "mongodb+srv://projet-DMWM:projet-DMWM@projet-dmwm.6gr4rs9.mongodb.net/?retryWrites=true&w=majority", {
                useUnifiedTopology: true,
            }
        );

        console.log("Database connection success");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;