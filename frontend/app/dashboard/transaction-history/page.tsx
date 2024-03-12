"use client";
import { transactions } from "@/api";
import { Transaction } from "@/types";
import React, { useEffect, useState } from "react";
import { FcViewDetails } from "react-icons/fc";
import { toast } from "react-toastify";

const TransactionHistory = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    transactions
      .getAllTransactions({ page })
      .then((data) => setData(data?.data.transactions || []))
      .catch((err) => toast(err.message));
  }, [page]);

  return (
    <div className=" max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FcViewDetails />
          Transaction History
        </h2>
      </div>

      <div className="overflow-x-auto mx-auto">
        <table className="table  table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>DATE</th>
              <th>SOURCE / DESTINATION</th>
              <th>CATEGORY</th>
              <th>METHOD</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 12).map((item) => (
              <tr key={item.id}>
                <td>
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{item.source_destination}</td>
                <td>{item.category}</td>
                <td>{item.transaction_method}</td>
                {item.transaction_type == "INCOME" ? (
                  <td className="font-semibold text-green-500">
                    ${item.amount}
                  </td>
                ) : (
                  <td className="font-semibold text-red-500">
                    -${item.amount}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="join my-4 ">
        <button
          className="join-item btn btn-sm font-normal"
          onClick={(e) => setPage(page > 1 ? page - 1 : page)}
        >
          «
        </button>
        <button className="join-item btn btn-sm font-normal">
          Page {page}
        </button>
        <button
          className="join-item btn btn-sm font-normal"
          onClick={(e) => setPage(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
