const mongoose = require('mongoose');

const dbConnection = () => {
    console.log("Establishing connection");
    mongoose
        .connect(process.env.MONGO_DB_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.error("Error connecting to MongoDB:", error));
};

const connection = mongoose.connection;
connection.once("open", () => console.log("Connection established"));

module.exports = dbConnection;
