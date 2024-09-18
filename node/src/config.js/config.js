const dotenv = require('dotenv');

dotenv.config();
const DBURL = process.env.DBURL


module.exports = DBURL