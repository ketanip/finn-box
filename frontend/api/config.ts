import { getJWTToken } from "@/utils/jwt";

const getAuthHeader = () => {
    return `Bearer ${getJWTToken()}`;
}

const BASE_URL = "http://localhost:3001";

export {
    BASE_URL,
    getAuthHeader,
}