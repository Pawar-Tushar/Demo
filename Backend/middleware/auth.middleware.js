import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"


export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader?.startsWith('Bearer ')) {
            return next(new ApiError(401, "No token provided or invalid format"));
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return next(new ApiError(401, "Access token is required"));
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err.message);
                if (err.name === 'TokenExpiredError') {
                    return next(new ApiError(401, "Token has expired"));
                }
                return next(new ApiError(401, "Invalid token"));
            }
            
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Auth middleware error:", error);
        return next(new ApiError(500, "Authentication error"));
    }
};