const mongoose = require('mongoose');
const DBURL = require('./config'); // Assuming config.js exports a fallback DB URL

const connectDB = () => {
    const username = process.env.USER;
    const host = process.env.HOST;
    const password = process.env.PASSWORD;
    const db = process.env.DB;
    const port = process.env.PORT ; // Default port if not set

    // Construct the MongoDB connection URL
    // mongodb://u0hj6ntji8cedro2v6ho:IHy742BoI3R1lKwJd2I@b2bprg2skkjwelz3wmk7-mongodb.services.clever-cloud.com:2196/b2bprg2skkjwelz3wmk7
    const dburl = `mongodb://${username}:${password}@${host}:${port}/${db}`;

    // Use the environment variable URL if it exists; otherwise, use the constructed URL
    const finalDBURL = DBURL || dburl;

    mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Server is up and running on port ${process.env.PORT}
            and ${dburl}`);
    })
    .catch((err) => {
        console.error("Error connecting:", err);
        process.exit(1);
    });
}

module.exports = connectDB;
