const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel')

dotenv.config()

const authMiddleware = async (req, res, next) => {
    try {
        const actualToken = req.header('Authorization').replace('Bearer ', '');
        
        if(!actualToken) {
            return res.status(401).json({
                message: "Authorization token is missing"
            })
        }
        const decode = jwt.verify(actualToken, process.env.SECRET_KEY)
        // console.log(decode)
        const user = await User.findById(decode.userId)

        if (!user) {
            return res.status(401).json({ message: 'User not found'})

            
        }
        req.user = user
        next()
    } catch (err) {
        if (!res.headersSent) {
            res.status(401).json({ message: 'Unauthorized from Auth' });
        }
    }


}

module.exports = authMiddleware

