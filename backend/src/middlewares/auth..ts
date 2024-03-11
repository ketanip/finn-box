import CONFIG from "@/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = async(req: Request, res: Response, next: NextFunction) => {

    try {
        
        const jwt_header = req.headers['authorization']?.split(" ")[1];
        if (!jwt_header) {
            res.status(401).json({message: "JWT token missing.", data: {}});
            return;
        }

        const data: any = jwt.verify(jwt_header, CONFIG.AUTH.JWT.JWT_SECRET, {
            algorithms: ["HS256"],
            audience: CONFIG.AUTH.JWT.JWT_AUDIENCE,
        });
        res.locals.user = data.user;
        next();

    } catch (error) {
        console.trace(error);
        res.status(401).json({message: "Invalid JWT token.", data: {}});
    };

};

export default authenticate;