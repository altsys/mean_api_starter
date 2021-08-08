import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseMessages.js";

const auth = async (req, res, next) => {
    const token = req.header('authToken');
    if (!token) return errorResponse(res, "401: Access Denied Error.", 401);
    try {
        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        errorResponse(res, error, 400);
    }
}

export default auth;