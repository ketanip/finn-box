import { CategoryData, Totals, TransactionMethodsData, TransactionsChartData } from "@/types";

function convertToCategoryData(originalData: any): CategoryData {
    const labels: string[] = [];
    const data: number[] = [];

    originalData.forEach((item: any) => {
        labels.push(item.category);
        data.push(item._sum.amount);
    });

    return { labels, data };
}

function convertToTransactionMethods(
    originalData: any
): TransactionMethodsData {
    const labels: string[] = [];
    const data: number[] = [];

    originalData.forEach((item: any) => {
        labels.push(item.transaction_method);
        data.push(item._sum.amount);
    });

    return { labels, data };
}

function convertToTransactionsChartData(
    originalData: any
): TransactionsChartData {
    const labels: string[] = [];
    const income: number[] = [];
    const expense: number[] = [];
    let push = true;

    originalData.forEach((item: any) => {
        if (push) labels.push(item.transaction_date);
        push = !push;

        if (item.transaction_type === "INCOME") {
            income.push(item._sum.amount);
        } else {
            expense.push(-item._sum.amount);
        }
    });
    return { labels, datasets: { income, expense } };
}

function convertToTotals(transactionStats: any): Totals {
    let totalIncome = 0;
    let totalExpense = 0;

    transactionStats.forEach((item: any) => {
        if (item.transaction_type === "INCOME") {
            totalIncome += item._sum.amount;
        } else {
            totalExpense += item._sum.amount;
        }
    });

    return { total_income: totalIncome, total_expense: totalExpense };
}

function humanizeNumber(number: number = 0): string {
    const abbreviations = ["K", "M", "B", "T"];
    const ranges = [1000, 1000000, 1000000000, 1000000000000];

    for (let i = abbreviations.length - 1; i >= 0; i--) {
        const range = ranges[i];
        if (number >= range) {
            return (number / range).toFixed(1) + abbreviations[i];
        }
    }

    return number.toString();
}


export {
    convertToCategoryData,
    convertToTransactionMethods,
    convertToTransactionsChartData,
    convertToTotals,
    humanizeNumber,
};