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

const category_data: ChartData<"doughnut", number[], string> = {
  labels: [
    "Basic Necessities",
    "Utilities",
    "Transportation",
    "Healthcare",
    "Education",
    "Entertainment",
    "Investments",
    "Savings",
    // "Debt Repayment",
    // "Charity/Donations",
    // "Personal Care",
    // "Home Expenses",
    // "Technology",
    // "Dining Out",
    // "Pets",
    // "Hobbies",
    // "Gifts",
    // "Legal Expenses",
    // "Travel",
    // "Insurance Premiums",
  ],

  datasets: [
    {
      label: "Amount",
      data: [12, 19, 3, 5, 2, 3, 4],
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

const transaction_data = {
  labels: [
    "05-03-2024",
    "06-03-2024",
    "07-03-2024",
    "08-03-2024",
    "09-03-2024",
    "10-03-2024",
    "11-03-2024",
    "12-03-2024",
  ],
  datasets: [
    {
      label: "Income",
      data: [10, 12, 34, 55, 22, 10, 15, 100],
      backgroundColor: "#21b81f",
    },
    {
      label: "Expense",
      data: [-5, -40, -3, -5, -22, -20, -1, -50],
      backgroundColor: "#ff4b4b ",
    },
  ],
};

const transaction_options = {
  plugins: {
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart - Stacked",
    // },
  },
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

const transaction_method_data: ChartData<"doughnut", number[], string> = {
  labels: [
    "UPI Lite",
    "UPI",
    "Cash",
    "Credit Card",
    "Debit Card",
    "Bank Transfer",
    "Other",
  ],

  datasets: [
    {
      label: "Amount",
      data: [100, 80, 34, 55, 22, 10, 15],
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

const latest_transactions = [
  {
    id: 1,
    date: "2024-03-01",
    source_destination: "Salary",
    category: "Income",
    amount: 3000.0,
    transaction_method: "Bank Transfer",
  },
  {
    id: 2,
    date: "2024-03-05",
    source_destination: "Grocery Store",
    category: "Food",
    amount: 150.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 3,
    date: "2024-03-08",
    source_destination: "Amazon",
    category: "Shopping",
    amount: 200.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 4,
    date: "2024-03-10",
    source_destination: "Gas Station",
    category: "Transportation",
    amount: 40.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 5,
    date: "2024-03-12",
    source_destination: "Restaurant",
    category: "Food",
    amount: 80.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 6,
    date: "2024-03-12",
    source_destination: "Store",
    category: "Shopping",
    amount: 100.0,
    transaction_method: "UPI",
  },
];

export const TransactionCharts = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Day Wise Distribution */}
      <div className="col-span-2 border-2 rounded-lg shadow-md  p-4">
        <h2 className="font-bold mb-4 ">Transaction History</h2>
        <Bar options={transaction_options} data={transaction_data} />
      </div>

      {/* Latest 5 Transactions */}
      <div className="border-2 rounded-lg shadow-md">
        <div className="max-w-xl p-4 ">
          <h2 className="font-bold mb-4 ">Latest Transactions</h2>
      <div className="flex flex-col gap-2 text-xs">
        {latest_transactions.map((item) => (
          <div key={item.id} className="even:bg-gray-50 px-4 py-2 flex flex-col gap-1">
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
            <span className="bg-white px-2 rounded-lg  border-teal-400 border-2">{item.source_destination}</span>
            <span className="bg-white px-2 rounded-lg border-blue-400 border-2">{item.transaction_method}</span>
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
          <Doughnut data={category_data} options={{}} />
        </div>
      </div>

      {/* Transaction Method wise distribution. */}
      <div className="border-2 rounded-lg shadow-md">
        <div className="max-w-xl p-4 ">
          <h2 className="font-bold mb-4 ">Transaction Methods</h2>
          <Doughnut data={transaction_method_data} />
        </div>
      </div>
    </div>
  );
};
