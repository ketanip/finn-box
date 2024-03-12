import { z } from "zod";

const dashboardData = z.object({
    start_date: z.coerce.date().optional().default(() => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    }),
    end_date: z.coerce.date().optional().default(() => new Date()),
});

const transactionsData = z.object({
    start_date: z.coerce.date().optional().default(() => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    }),
    end_date: z.coerce.date().optional().default(() => new Date()),
    page: z.coerce.number().min(1).default(1),
});

const createTransaction = z.object({
    amount: z.number().min(1),
    source_destination: z.string().min(1),
    transaction_type: z.enum(["EXPENSE", "INCOME"]),
    transaction_method: z.string(),
    category: z.string(),
    notes: z.string().optional(),
});

const updateTransaction = z.object({
    amount: z.number().min(1).optional(),
    source_destination: z.string().min(1).optional(),
    transaction_type: z.enum(["EXPENSE", "INCOME"]).optional(),
    transaction_method: z.string().optional(),
    category: z.string().optional(),
    notes: z.string().optional(),
});

const transactionID = z.object({ id: z.coerce.number() });

export default {
    dashboardData,
    transactionsData,
    createTransaction,
    updateTransaction,
    transactionID,
};