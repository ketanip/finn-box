"use client";
import React, { useEffect, useState } from "react";
import { TransactionCharts } from "./components/TransactionCharts";
import { FcAreaChart, FcOvertime } from "react-icons/fc";
import {
  CategoryData,
  Totals,
  Transaction,
  TransactionMethodsData,
  TransactionsChartData,
} from "@/types";
import { transactions } from "@/api";
import { toast } from "react-toastify";

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


const DashboardPage = () => {
  const [categoryData, setCategoryData] = useState<CategoryData>(
    {} as CategoryData
  );
  const [transactionsChartsData, setTransactionsChartsData] =
    useState<TransactionsChartData>({} as TransactionsChartData);
  const [transactionsMethodData, setTransactionsMethodData] =
    useState<TransactionMethodsData>({} as TransactionMethodsData);
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>(
    []
  );
  const [statsData, setStatsData] =
  useState<Totals>({} as Totals);

  useEffect(() => {
    console.log("THIS WORKS");
    transactions
      .getDashboardData()
      .then((data) => {
        if (data?.data) {
          setCategoryData(
            convertToCategoryData(data.data.category_wise_distribution)
          );
          setTransactionsMethodData(
            convertToTransactionMethods(
              data.data.transaction_methods_distribution
            )
          );
          setTransactionsChartsData(
            convertToTransactionsChartData(
              data.data.transaction_history_aggregate
            )
          );

          setLatestTransactions(data.data.latest_transactions.slice(0, 5));
          setStatsData(convertToTotals(data.data.transaction_stats));

        }
      })
      .catch((err) => toast(err.data.message));
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 flex">
        <div className="flex-1">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FcAreaChart /> <span>Dashboard</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <FcOvertime />
          <select
            name="time_period"
            id="time_period"
            className="select select-sm"
          >
            <option value="7">Last Week</option>
            <option value="14">Last 2 weeks</option>
            <option value="28">Last Month</option>
            <option value="84">Last 3 Months</option>
            <option value="182">Last 6 Months</option>
            <option value="365">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="my-4 grid grid-cols-3 gap-4 items-center">
        <div className="flex flex-col bg-gray-50 rounded px-4 py-2">
          <span className="text-lg">${humanizeNumber(statsData.total_income-statsData.total_expense)}</span>
          <span className="text-sm font-bold">Net Transaction Value</span>
        </div>
        <div className="flex flex-col bg-gray-50 rounded px-4 py-2">
          <span className="text-lg">${humanizeNumber(statsData.total_income)}</span>
          <span className="text-sm font-bold">Total Income</span>
        </div>
        <div className="flex flex-col bg-gray-50 rounded px-4 py-2">
          <span className="text-lg">${humanizeNumber(statsData.total_expense)}</span>
          <span className="text-sm font-bold">Total Expense</span>
        </div>
      </div>

      {/* Transactions Charts */}
      {latestTransactions.length > 0 && (
        <TransactionCharts
          category_data={categoryData}
          transactions_charts_data={transactionsChartsData}
          transactions_method_data={transactionsMethodData}
          latest_transactions={latestTransactions}
        />
      )}
    </div>
  );
};

export default DashboardPage;
