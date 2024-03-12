"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  CategoryData,
  Transaction,
  TransactionMethodsData,
  TransactionsChartData,
} from "@/types";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const transaction_options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

interface Props {
  category_data: CategoryData;
  transactions_charts_data: TransactionsChartData;
  transactions_method_data: TransactionMethodsData;
  latest_transactions: Transaction[];
}

export const TransactionCharts: React.FC<Props> = ({
  category_data,
  transactions_charts_data,
  transactions_method_data,
  latest_transactions,
}) => {
  const category_data_cleaned: ChartData<"doughnut", number[], string> = {
    labels: category_data.labels,

    datasets: [
      {
        label: "Amount",
        data: category_data.data,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(0, 128, 255, 1)",
          "rgba(255, 215, 0, 1)",
          "rgba(0, 255, 128, 1)",
          "rgba(153, 0, 255, 1)",
          "rgba(255, 128, 0, 1)",
          "rgba(139, 69, 19, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(255, 69, 0, 1)",
          "rgba(148, 0, 211, 1)",
          "rgba(255, 140, 0, 1)",
          "rgba(0, 205, 102, 1)",
          "rgba(255, 0, 255, 1)",
          "rgba(255, 165, 0, 1)",
          "rgba(60, 179, 113, 1)",
          "rgba(255, 20, 147, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(65, 105, 225, 1)",
          "rgba(218, 112, 214, 1)",
          "rgba(128, 0, 128, 1)",
        ],
      },
    ],
  };

  const transaction_data_cleaned = {
    labels: transactions_charts_data.labels,
    datasets: [
      {
        label: "Income",
        data: transactions_charts_data.datasets.income,
        backgroundColor: "#21b81f",
      },
      {
        label: "Expense",
        data: transactions_charts_data.datasets.expense,
        backgroundColor: "#ff4b4b ",
      },
    ],
  };

  const transaction_method_data_cleaned: ChartData<
    "doughnut",
    number[],
    string
  > = {
    labels: transactions_method_data.labels,

    datasets: [
      {
        label: "Amount",
        data: transactions_method_data.data,
        backgroundColor: [
          "rgba(255, 165, 0, 1)",
          "rgba(0, 128, 128, 1)",
          "rgba(255, 0, 255, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(0, 128, 0, 1)",
          "rgba(255, 0, 0, 1) ",
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Day Wise Distribution */}
      <div className="col-span-2 border-2 rounded-lg shadow-md  p-4">
        <h2 className="font-bold mb-4 ">Transaction History</h2>
        <Bar options={transaction_options} data={transaction_data_cleaned} />
      </div>

      {/* Latest 5 Transactions */}
      <div className="border-2 rounded-lg shadow-md">
        <div className="max-w-xl p-4 ">
          <h2 className="font-bold mb-4 ">Latest Transactions</h2>
          <div className="flex flex-col gap-2 text-xs">
            {latest_transactions.map((item) => (
              <div
                key={item.id}
                className="even:bg-gray-50 px-4 py-2 flex flex-col gap-1"
              >
                {item.category == "Income" ? (
                  <span className="font-semibold text-green-500">
                    ${item.amount}
                  </span>
                ) : (
                  <span className="font-semibold text-red-500">
                    -${item.amount}
                  </span>
                )}
                <div className="flex gap-2">
                  <span className="bg-white px-2 rounded-lg  border-teal-400 border-2">
                    {item.source_destination}
                  </span>
                  <span className="bg-white px-2 rounded-lg border-blue-400 border-2">
                    {item.transaction_method}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category wise distribution. */}
      <div className="border-2 rounded-lg shadow-md">
        <div className="max-w-xl p-4 ">
          <h2 className="font-bold mb-4 ">Category Wise Distribution</h2>
          <Doughnut
            data={category_data_cleaned}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Transaction Method wise distribution. */}
      <div className="border-2 rounded-lg shadow-md">
        <div className="max-w-xl p-4 ">
          <h2 className="font-bold mb-4 ">Transaction Methods</h2>
          <Doughnut data={transaction_method_data_cleaned} />
        </div>
      </div>
    </div>
  );
};
