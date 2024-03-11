import dotenv from "dotenv";
dotenv.config();

const CONFIG = {

    SERVER: {
        PORT: 3001,
    },

    AUTH: {
        JWT: {
            JWT_SECRET: "JWT_SECRET",
            JWT_AUDIENCE: "users",
            JWT_ALGORITHM: "HS256",
            JWT_EXPIRES_IN: "7d"
        }
    }

};

export default CONFIG;