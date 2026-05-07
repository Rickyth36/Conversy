// Middleware to protect routes

import jwt from "jsonwebtoken";
import user from "../models/user.js";


export const protectRoute = async(req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const isUser = await user.findById(decoded.userId).select("-password");
        if(!isUser) {
            return res.json({
                success: false,
                message: "User not found"
            })
        };
        req.user = isUser;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}