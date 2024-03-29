export interface TransactionsDataFilter {
    start_data?: Date;
    end_data?: Date;
    page?: number;
}

export interface TransactionHistoryAggregate {
    _sum: {
        amount: number;
    };
    transaction_type: "INCOME" | "EXPENSE";
    transaction_date: string;
}

export interface CategoryWiseDistribution {
    _sum: {
        amount: number;
    };
    category: string;
}

export interface TransactionMethodsDistribution {
    _sum: {
        amount: number;
    };
    transaction_method: string;
}

export interface Transaction {
    id: number;
    transaction_type: string;
    source_destination: string;
    category: string;
    transaction_method: string;
    amount: number;
    notes: string;
    transaction_date: string;
    created_at: string;
    updated_at: string;
    user_id: string;
}

export interface TransactionStat {
    _sum: {
        amount: number;
    };
    transaction_type: "INCOME" | "EXPENSE";
}

export interface Totals {
    total_income: number;
    total_expense: number;
};

export interface GetDashboardDetails {
    message: string;
    data: {
        transaction_history_aggregate: TransactionHistoryAggregate[];
        category_wise_distribution: CategoryWiseDistribution[];
        transaction_methods_distribution: TransactionMethodsDistribution[];
        latest_transactions: Transaction[];
        transaction_stats: TransactionStat[];
    };
}

export interface GetAllTransactions {
    message: string;
    data: { transactions: Transaction[] };
}


export interface GetTransactionData {
    message: string;
    data: { transaction: Transaction };
}

export interface DeleteTransaction {
    message: string;
    data: {};
}

export interface CreateTransaction {
    "transaction_type": string;
    "source_destination": string;
    "category": string;
    "transaction_method": string;
    "amount": number,
    "notes": string;
}

export interface CategoryData {
    labels: string[];
    data: number[];
}

export interface TransactionsChartData {
    labels: string[];
    datasets: { income: number[]; expense: number[] };
}
export interface TransactionMethodsData {
    labels: string[];
    data: number[];
}