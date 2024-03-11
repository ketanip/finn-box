import { z } from "zod";

const signUp = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(32)
});

const signIn = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32)
});

export default {
    signIn,
    signUp
};