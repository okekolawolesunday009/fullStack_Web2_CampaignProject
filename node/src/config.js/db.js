const mongoose = require('mongoose');
const DBURL = require('./config'); // Assuming config.js exports a fallback DB URL

const connectDB = () => {
    const username = process.env.USER;
    const host = process.env.HOST;
    const password = process.env.PASSWORD;
    const db = process.env.DB;
    const port = process.env.PORT || 27017; // Default port if not set

    // Construct the MongoDB connection URL
    const dburl = `mongodb://${username}:${password}@${host}:${port}/${db}`;

    // Use the environment variable URL if it exists; otherwise, use the constructed URL
    const finalDBURL = DBURL || dburl;

    mongoose.connect(finalDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Server is up and running on port ${process.env.PORT}`);
    })
    .catch((err) => {
        console.error("Error connecting:", err);
        process.exit(1);
    });
}

module.exports = connectDB;
