import { db } from "@/db";
import validators from "./validators";
import { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const DashboardData = async (req: Request, res: Response) => {

    try {

        // Getting user and data.
        const user = res.locals.user;
        const data = await validators.dashboardData.parseAsync(req.query);

        // Getting main data.

        // Transaction history aggregate by day for main chart.
        const transaction_history_aggregate = await db.transactions.groupBy({
            by: ['transaction_type', 'transaction_date'],
            _sum: {
                amount: true,
            },
            orderBy: {
                transaction_date: "asc",
            },
            where: {
                created_at: { gte: data.start_date, lte: data.end_date },
                user_id: user.id,
            }
        });

        // Category wise distribution for pie chart.
        const category_wise_distribution = await db.transactions.groupBy({
            by: ['category'],
            _sum: {
                amount: true,
            },
            orderBy: {
                category: "asc",
            },
            where: {
                created_at: { gte: data.start_date, lte: data.end_date },
                user_id: user.id,
            }
        });

        // Transaction method for pie chart.
        const transaction_methods_distribution = await db.transactions.groupBy({
            by: ['transaction_method'],
            _sum: {
                amount: true,
            },
            orderBy: {
                transaction_method: "asc",
            },
            where: {
                created_at: { gte: data.start_date, lte: data.end_date },
                user_id: user.id,
            }
        });

        // Last 5 transactions.
        const latest_transactions = await db.transactions.findMany({
            where: {
                user_id: user.id,
                created_at: { gte: data.start_date, lte: data.end_date },
            },
            orderBy: {
                created_at: "desc",
            },
            take: 10,
        });

        // Transaction Stats.
        const transaction_stats = await db.transactions.groupBy({
            by: ['transaction_type'],
            _sum: {
                amount: true,
            },
            where: {
                created_at: { gte: data.start_date, lte: data.end_date },
                user_id: user.id,
            }
        });


        res.status(200).json({
            message: "", data: {
                transaction_history_aggregate,
                category_wise_distribution,
                transaction_methods_distribution,
                latest_transactions,
                transaction_stats,
            }
        });
        return;


    } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({ message: fromZodError(error).toString(), data: {} });
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };
};

const AllTransaction = async (req: Request, res: Response) => {

    try {

        // Getting user and data.
        const user = res.locals.user;
        const data = await validators.transactionsData.parseAsync(req.query);

        // Getting main data.
        const offset = (data.page - 1) * 25;
        const transactions = await db.transactions.findMany({
            where: {
                user_id: user.id,
                created_at: { gte: data.start_date, lte: data.end_date },
            },
            orderBy: {
                created_at: "desc",
            },
            take: 25,
            skip: offset,
        });

        res.status(200).json({
            message: "", data: {
                transactions,
            }
        });
        return;


    } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({ message: fromZodError(error).toString(), data: {} });
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };

};

const getTransaction = async (req: Request, res: Response) => {
    try {

        // Getting user and data.
        const user = res.locals.user;
        const { id: transaction_id } = await validators.transactionID.parseAsync(req.params);

        // Recording transaction.
        const transaction = await db.transactions.findUnique({ where: { id: transaction_id } });
        if (!transaction || transaction.user_id != user.id) {
            res.status(422).json({ message: "You are not authorized to access this data.", data: {} });
            return;
        }

        res.json({ message: "", data: { transaction } });
        return;

    } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({ message: fromZodError(error).toString(), data: {} });
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };
};

const createTransaction = async (req: Request, res: Response) => {
    try {

        // Getting user and data.
        const user = res.locals.user;
        const data = await validators.createTransaction.parseAsync(req.body);

        // Recording transaction.
        const transaction = await db.transactions.create({
            data: {
                ...data,
                user_id: user.id,
                created_at: new Date(),
                transaction_date: new Date().toISOString().slice(0, 10),
                updated_at: new Date(),
            },
        });

        res.json({ message: "Transaction recorded successfully.", data: { transaction } });
        return;

    } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({ message: fromZodError(error).toString(), data: {} });
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };
};

const updateTransaction = async (req: Request, res: Response) => {
    try {

        // Getting user and data.
        const user = res.locals.user;
        const { id: transaction_id } = await validators.transactionID.parseAsync(req.params);
        const updated_data = await validators.updateTransaction.parseAsync(req.body);

        // Recording transaction.
        const transaction = await db.transactions.findUnique({ where: { id: transaction_id }, select: { user_id: true } });
        if (!transaction || transaction.user_id != user.id) {
            res.status(404).json({ message: "Transaction not found.", data: {} });
            return;
        }

        const updated_transaction = await db.transactions.update({
            where: {
                id: transaction_id,
            },
            data: updated_data,
        });

        res.json({ message: "Transaction updated successfully.", data: { updated_transaction } });
        return;

    } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({ message: fromZodError(error).toString(), data: {} });
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };
};

const deleteTransaction = async (req: Request, res: Response) => {
    try {

        // Getting user and data.
        const user = res.locals.user;
        const { id: transaction_id } = await validators.transactionID.parseAsync(req.params);

        // Recording transaction.
        const transaction = await db.transactions.findUnique({ where: { id: transaction_id }, select: { user_id: true } });
        if (!transaction || transaction.user_id != user.id) {
            res.status(404).json({ message: "Transaction not found.", data: {} });
            return;
        }

        // Deleting record.
        await db.transactions.delete({ where: { id: transaction_id } });

        res.json({ message: "Transaction deleted successfully.", data: {} });
        return;

    } catch (error) {

        if (error instanceof z.ZodError) {
            res.status(422).json({ message: fromZodError(error).toString(), data: {} });
            return;
        }

        res.status(500).json({ message: "Internal server error.", data: {} });
        return;
    };
};

export default {
    DashboardData,
    AllTransaction,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};