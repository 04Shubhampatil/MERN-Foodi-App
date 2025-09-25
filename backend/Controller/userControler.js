import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.id);
        return res.status(200).json({
            message: "User fetched successfully",
            user,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let profileUrl = null;

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto",
            });
            profileUrl = cloudResponse.secure_url;
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            Profile: profileUrl
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Password is incorrect",
                success: false
            });
        }

        const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);

        const newUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            Profile: user.Profile
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user: newUser,
                success: true
            });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export {
    registerUser,
    LogIn,
    logout,
    getUser
};