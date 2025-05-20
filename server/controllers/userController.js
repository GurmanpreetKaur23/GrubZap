import express from "express";  // Default import
const { Request, Response } = express;  // Destructuring types from the default import
import userModel from "../models/userModel.js"; // Ensure .js extension is added
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// token creation
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined in environment variables.");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = createToken(user._id.toString());
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Error logging in user" });
    }
};

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Register payload:", { name, email, password });

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ msg: "Password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id.toString());

        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

export { loginUser, registerUser };