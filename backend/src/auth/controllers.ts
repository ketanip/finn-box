import db from "@/db";
import argon2 from "argon2";
import CONFIG from "@/config";
import jwt from "jsonwebtoken";
import validators from "./validators";
import { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from 'zod-validation-error';

const SignUp = async (req: Request, res: Response) => {

    try {

        const data = await validators.signUp.parseAsync(req.body);

        // Checking is existing user with this email already exits.
        const existing_user = await db.users.findUnique({ where: { email: data.email } });
        if (existing_user) {
            res.status(500).json({ message: "User with this email already exits, please login.", data: {} });
            return;
        }

        // Hashing password.
        data.password = await argon2.hash(data.password);

        // Creating new user.        
        const new_user = await db.users.create({
            data: data,
        });
        res.status(200).json({ message: "User created successfully, please login.", data: {} })
        return;

    } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({message: fromZodError(error).toString(), data: {}});
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };

};

const SignIn = async (req: Request, res: Response) => {

    try {

        const data = await validators.signIn.parseAsync(req.body);

        // Finding existing user with this email.
        const user = await db.users.findUnique({ where: { email: data.email } });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password.", data: {} });
            return;
        }

        // Validating password.
        const result = await argon2.verify(user.password, data.password);
        if (!result) {
            res.status(401).json({ message: "Invalid email or password.", data: {} });
            return;
        }

        // Logging in user by creating JWT token and then sending it.
        const jwt_payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            email_verified: user.email_verified,
        };

        const jwt_token = jwt.sign({ user: jwt_payload }, CONFIG.AUTH.JWT.JWT_SECRET, {
            algorithm: "HS256",
            audience: CONFIG.AUTH.JWT.JWT_AUDIENCE,
            expiresIn: CONFIG.AUTH.JWT.JWT_EXPIRES_IN,
        });

        res.status(200).json({ message: "Logged in successfully.", data: { token: jwt_token, user: jwt_payload } });
        return;

  } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({message: fromZodError(error).toString(), data: {}});
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };

};

export default {
    SignUp,
    SignIn,
};