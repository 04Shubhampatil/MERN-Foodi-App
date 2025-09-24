
import User from "../Models/userModel.js";
import ApiError from "../utils/Apierror.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.id)
        return res.status(200).json({
            message: "User fetched successfully",
            user,
            success: true
        })
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}
const registerUser = async (req, res) => {

    try {
        const { fullname, email, password } = req.body
        console.log(fullname, email, password);
        


        if (!fullname || !email || !password) {

            throw new ApiError(400, "All fields are required");
        }
        const user = await User.findOne({
            $or: [{ email: email }]
        });
        if (user) {
            throw new ApiError(400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            success: true
        });

    } catch (error) {

        throw new ApiError(500, error.message)

    };
};

const LogIn = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(400, "User not found")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new ApiError(400, "Password is incorrect")
        }

        const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY)

        const newUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            Profile: user.Profile

        }
        return res
            .status(200)  // Set HTTP status code to 200 OK
            .cookie("token", token, {   // Set a cookie fullnamed "token"
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
                httpOnly: true  // Secure: can't be accessed from frontend JavaScript
            })
            .json({   // Send JSON response body
                message: `Welcome back ${user.fullname}`,
                user: newUser,
                success: true
            });
    } catch (error) {

        throw new ApiError(500, error.message)

    }


}


const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}



export {
    registerUser,
    LogIn,
    logout,
    getUser

}