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

export default {
    dashboardData,
    transactionsData,
};