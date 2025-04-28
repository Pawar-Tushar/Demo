import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";




export const authenticateToken = (req, res, next) => {
    try {
        let token;
        console.log("exectuting  middlaware !!!!!!!!!!!!!!!!!!!!")

        const authHeader = req.headers.authorization;
        // console.log(authHeader)
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
            console.log("token in header")

        }

        if (!token && req.cookies?.__accessToken) {
            token = req.cookies.__accessToken;
            console.log("token in cookie")
        }

        if (!token) {
            return next(new ApiError(401, "No token provided or invalid format"));
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
