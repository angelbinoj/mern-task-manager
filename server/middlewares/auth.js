import jwt from "jsonwebtoken";
import { NotFoundError, sendError } from "./errorMiddlewares.js";

export const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            throw new NotFoundError("token not found")
        }
        const tokenValue = token.split(" ")[1]
        
        
        
        jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
            console.log(err);
            
            if (err) {
                return sendError(res, "invalid token", 403)
            }
            console.log(user);
            
            req.user = user;
            console.log(req.user);
            
            console.log(tokenValue);
            next()
        })

    } catch (error) {

        sendError(res, error.message)
    }
}