import { getJWTToken } from "@/utils/jwt";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "./config";
import { TransactionsDataFilter, GetAllTransactions, GetDashboardDetails } from "@/types";

const getAllTransactions = async (data: TransactionsDataFilter = {}) => {

    const request_config = {
        method: 'GET',
        url: `${BASE_URL}/transactions/`,
        params: data,
        headers: {
            Authorization: getAuthHeader(),
        }
    };

    try {
        const response = await axios(request_config);
        return response.data as GetAllTransactions;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data as GetAllTransactions;
        }
    };

};

const getDashboardData = async (data: TransactionsDataFilter = {}) => {

    const request_config = {
        method: 'GET',
        url: `${BASE_URL}/transactions/dashboard-data`,
        params: data,
        headers: {
            Authorization: getAuthHeader(),
        }
    };

    try {
        const response = await axios(request_config);
        console.log(response.data)
        return response.data as GetDashboardDetails;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data as GetDashboardDetails;
        }
    };

};

export {
    getAllTransactions,
    getDashboardData,
}
