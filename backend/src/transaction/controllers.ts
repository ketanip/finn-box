import db from "@/db";
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
            by: ['transaction_type','transaction_date'],
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

export default {
    DashboardData,
    AllTransaction,
};