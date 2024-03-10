"use client";
import React from "react";
import { TransactionCharts } from "./components/TransactionCharts";
import { FcAreaChart, FcOvertime } from "react-icons/fc";

const DashboardPage = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 flex">
        <div className="flex-1">
            <h2 className="text-xl font-bold flex items-center gap-2"><FcAreaChart /> <span>Dashboard</span></h2>
        </div>
        <div className="flex items-center gap-2">
        <FcOvertime />
        <select name="time_period" id="time_period" className="select select-sm">
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
          <span className="text-lg">$500</span>
          <span className="text-sm font-bold">Net Transaction Value</span>
        </div>
        <div className="flex flex-col bg-gray-50 rounded px-4 py-2">
          <span className="text-lg">$1,500</span>
          <span className="text-sm font-bold">Total Income</span>
        </div>
        <div className="flex flex-col bg-gray-50 rounded px-4 py-2">
          <span className="text-lg">$1,000</span>
          <span className="text-sm font-bold">Total Expense</span>
        </div>
      </div>

      {/* Transactions Charts */}
      <TransactionCharts />
      
    </div>
  );
};

export default DashboardPage;
