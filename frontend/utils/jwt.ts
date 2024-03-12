interface User {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
}

const setJWTToken = (token: string) => {
    localStorage.setItem("jwt_token", token);
};

const getJWTToken = () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) throw new Error("JWT Token not found.");
    return token;
};

const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
    const token = localStorage.getItem("user");
    if (!token) throw new Error("JWT Token not found.");
    return JSON.parse(token) as User;
};

export {
    setJWTToken,
    setUser,
    getJWTToken,
    getUser
};