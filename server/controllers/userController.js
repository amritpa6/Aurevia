import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import Car from '../models/Car.js';


// Generate JWT Token
const generateToken = (userId) => {
    // Implementation for generating JWT token
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// User Registration Controller
export const registerUser = async (req, res) =>  {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password || password.length < 8) {
            return res.status(400).json({ success: false, message: 'Fill all the fields and ensure password is at least 8 characters long' });
        }

        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        const token = generateToken(user._id.toString());
        res.status(201).json({ success: true, token});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// User Login Controller
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const token = generateToken(user._id.toString());
        res.status(200).json({ success: true, token });

        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}   

// Get user data using Token(JWT)
export const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all cars for the frontend
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvailable: true, isDeleted: { $ne: true } });
        res.status(200).json({ success: true, cars });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
