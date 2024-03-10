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

export const category_data: ChartData<"doughnut", number[], string> = {
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

export const TransactionCharts = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Day Wise Distribution */}
      <div className="col-span-2 border-2 rounded-lg shadow-md  p-4">
        <h2 className="font-bold mb-4 ">Transaction History</h2>
        <Bar options={transaction_options} data={transaction_data} />
      </div>

      {/* Category wise distribution. */}
      <div className="border-2 rounded-lg shadow-md">
        <div className="max-w-xl p-4 ">
          <h2 className="font-bold mb-4 ">Category Wise Distribution</h2>
          <Doughnut data={category_data} options={{}} />
        </div>
      </div>
    </div>
  );
};
