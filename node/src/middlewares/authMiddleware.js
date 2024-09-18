const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel')

dotenv.config()

const authMiddleware = async (req, res, next) => {
    try {
        const actualToken = req.header('Authorization').replace('Bearer ', '');
        // console.log(actualToken, "auth")
        // const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token
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
        // console.log(user, "auth2")
        next()
    } catch (err) {
        if (!res.headersSent) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }


}

module.exports = authMiddleware

