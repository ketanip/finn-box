"use client";
import { transactions } from "@/api";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { FcAreaChart, FcOvertime } from "react-icons/fc";
import { TransactionCharts } from "./components/TransactionCharts";
import {
  CategoryData,
  Totals,
  Transaction,
  TransactionMethodsData,
  TransactionsChartData,
} from "@/types";
import {
  convertToCategoryData,
  convertToTransactionMethods,
  convertToTransactionsChartData,
  convertToTotals,
  humanizeNumber,
} from "./utils";

const DashboardPage = () => {

  // States
  const [categoryData, setCategoryData] = useState<CategoryData>({} as CategoryData);
  const [transactionsChartsData, setTransactionsChartsData] = useState<TransactionsChartData>({} as TransactionsChartData);
  const [transactionsMethodData, setTransactionsMethodData] = useState<TransactionMethodsData>({} as TransactionMethodsData);
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]  );
  const [statsData, setStatsData] = useState<Totals>({} as Totals);

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
          <span className="text-lg">
            ${humanizeNumber(statsData.total_income - statsData.total_expense)}
          </span>
          <span className="text-sm font-bold">Net Transaction Value</span>
        </div>
        <div className="flex flex-col bg-gray-50 rounded px-4 py-2">
          <span className="text-lg">
            ${humanizeNumber(statsData.total_income)}
          </span>
          <span className="text-sm font-bold">Total Income</span>
        </div>
        <div className="flex flex-col bg-gray-50 rounded px-4 py-2">
          <span className="text-lg">
            ${humanizeNumber(statsData.total_expense)}
          </span>
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
