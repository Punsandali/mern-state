import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js'

export const signup = async (req, res,next) => {
    console.log(req.body);

    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create and save the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json("User created successfully");
    } catch (error) {
        console.error("Error during signup:", error); // Log the exact error
        next(errorHandler(500, "error from the function")); // Forward to the error handler
    }
    
};
