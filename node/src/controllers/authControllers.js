const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bycrypt = require('bcrypt')
const dotenv = require('../../.env')

// dotenv.config()

const signup = async (req, res) => {
    try {
        const { fullName, email, role, image, region, password } = req.body
        const existingEmail = await User.findOne({email})
        if (existingEmail) {
            res.status(400).json({message: 'Email exist. Try new email or Login with Email'})
        }
        //hashing
        const salt = await bycrypt.genSalt(10)
        const hashPassword = await bycrypt.hash(password, salt)

        const newUser = new User({
            fullName, email, role: "author", region, password: hashPassword
        })
        const savedUser = await newUser.save();

        const payload = {
            userId : savedUser._id
        }
        const exp = {
            expiresIn: '3h'
        }
        const token = jwt.sign(payload,  process.env.SECRET_KEY, exp)
        // console.log(token)
        res.cookie('token', token).json({savedUser})

    } catch (err) {
        
        if (!res.headersSent) {
            return  res.status(500).json({message: 'Internal server Error from Signup '})
        }

    }
}

const login = async (req, res) => {
    try {
        const {email, password } = req.body
        const user = await User.findOne({email})

        if (!user) {
            res.status(400).json({message: 'User not found'})
        }

        const matchPassword = await bycrypt.compare(password, user.password)

        if (!matchPassword) {
            res.status(400).json({message: "Invalid Credentials"})

        }
        const payload = {
            userId: user._id
        }
        const exp = {
            expiresIn: '3h'
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, exp)
        // console.log(token)
        console.log(token)

        res.cookie('token', token).json({user})
    
    
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal server Error from Signup ', "err": err})

    }

}

const logout = async (req, res) => {
    try {
        res.clearcookies('token');
        res.status(200).json({message: 'Logout successful'})
    
    } catch (err) {
        res.status(500).json({message: 'Internal server Error from Signup '})

    }
}

module.exports = {
    signup,
    login,
    logout
}