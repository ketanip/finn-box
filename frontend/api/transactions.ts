import axios from "axios";
import { BASE_URL, getAuthHeader } from "./config";
import { TransactionsDataFilter, GetAllTransactions, GetDashboardDetails, Transaction, DeleteTransaction, GetTransactionData, CreateTransaction } from "@/types";

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

const getTransaction = async (id: number) => {

    const request_config = {
        method: 'GET',
        url: `${BASE_URL}/transactions/${id}`,
        headers: {
            Authorization: getAuthHeader(),
        }
    };

    try {
        const response = await axios(request_config);
        console.log(response.data)
        return response.data as GetTransactionData;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data as GetTransactionData;
        }
    };

};

const updateTransaction = async (id: number, data: Partial<Transaction>) => {

    const request_config = {
        method: 'PUT',
        url: `${BASE_URL}/transactions/${id}`,
        headers: {
            Authorization: getAuthHeader(),
        },
        data: data,
    };

    try {
        const response = await axios(request_config);
        console.log(response.data)
        return response.data as GetTransactionData;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data as GetTransactionData;
        }
    };

};

const createTransaction = async (data: CreateTransaction) => {

    const request_config = {
        method: 'POST',
        url: `${BASE_URL}/transactions/`,
        headers: {
            Authorization: getAuthHeader(),
        },
        data: data,
    };

    try {
        const response = await axios(request_config);
        console.log(response.data)
        return response.data as GetTransactionData;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data as GetTransactionData;
        }
    };

};

const deleteTransaction = async (id: number) => {

    const request_config = {
        method: 'DELETE',
        url: `${BASE_URL}/transactions/${id}`,
        headers: {
            Authorization: getAuthHeader(),
        }
    };

    try {
        const response = await axios(request_config);
        console.log(response.data)
        return response.data as DeleteTransaction;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data as DeleteTransaction;
        }
    };

};

export {
    getAllTransactions,
    getDashboardData,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    createTransaction,
};
