const mongoose = require('mongoose');
const DBURL = require('./config');


const connectDB = () => {
    // const DBURL = 'mongodb://127.0.0.1:27017/campaign'
    mongoose.connect(`${DBURL}`)
    .then((res) => {
        console.log(`server is up and running on ${process.env.PORT}`);
    })
    .catch((err) => {
        console.error("erro connecting:" ,err)
        process.exit(1);
    })
}
module.exports = connectDB