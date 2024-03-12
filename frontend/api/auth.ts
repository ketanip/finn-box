import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./config";


interface SignUpData {
    name: string;
    email: string;
    password: string;
};

interface SignInData {
    email: string;
    password: string;
};

const signUp = async (data: SignUpData) => {

    const request_config: AxiosRequestConfig = {
        url: `${BASE_URL}/auth/sign-up`,
        method: "POST",
        data: data
    };

    try {
        const response = await axios(request_config);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data;
        }
    };

}

const signIn = async (data: SignInData) => {

    const request_config: AxiosRequestConfig = {
        url: `${BASE_URL}/auth/sign-in`,
        method: "POST",
        data: data
    };

    try {
        const response = await axios(request_config);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data;
        }
    };

}

export {
    signUp,
    signIn,
}