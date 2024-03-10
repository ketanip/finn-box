import React from "react";
import { FcViewDetails } from "react-icons/fc";

const data = [
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
    date: "2024-03-15",
    source_destination: "Utility Company",
    category: "Bills",
    amount: 120.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 7,
    date: "2024-03-18",
    source_destination: "Clothing Store",
    category: "Shopping",
    amount: 100.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 8,
    date: "2024-03-20",
    source_destination: "Netflix",
    category: "Entertainment",
    amount: 15.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 9,
    date: "2024-03-22",
    source_destination: "Gas Station",
    category: "Transportation",
    amount: 35.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 10,
    date: "2024-03-25",
    source_destination: "Bank",
    category: "Savings",
    amount: 500.0,
    transaction_method: "UPI",
  },
  {
    id: 11,
    date: "2024-03-28",
    source_destination: "Coffee Shop",
    category: "Food",
    amount: 10.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 12,
    date: "2024-03-30",
    source_destination: "Online Store",
    category: "Shopping",
    amount: 75.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 13,
    date: "2024-04-02",
    source_destination: "Gas Station",
    category: "Transportation",
    amount: 45.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 14,
    date: "2024-04-05",
    source_destination: "Phone Company",
    category: "Bills",
    amount: 80.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 15,
    date: "2024-04-08",
    source_destination: "Restaurant",
    category: "Food",
    amount: 70.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 16,
    date: "2024-04-10",
    source_destination: "Bookstore",
    category: "Entertainment",
    amount: 25.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 17,
    date: "2024-04-12",
    source_destination: "Gas Station",
    category: "Transportation",
    amount: 30.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 18,
    date: "2024-04-15",
    source_destination: "Utilities",
    category: "Bills",
    amount: 150.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 19,
    date: "2024-04-18",
    source_destination: "Electronics Store",
    category: "Shopping",
    amount: 300.0,
    transaction_method: "UPI Lite",
  },
  {
    id: 20,
    date: "2024-04-20",
    source_destination: "Movie Theater",
    category: "Entertainment",
    amount: 40.0,
    transaction_method: "UPI Lite",
  },
];

const TransactionHistory = () => {
  return (
    <div className=" max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2"><FcViewDetails />Transaction History</h2>
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
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{item.source_destination}</td>
                <td>{item.category}</td>
                <td>{item.transaction_method}</td>
                {item.category == "Income" ? (
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
        <button className="join-item btn btn-sm font-normal">«</button>
        <button className="join-item btn btn-sm font-normal">Page 1</button>
        <button className="join-item btn btn-sm font-normal">»</button>
      </div>
    </div>
  );
};

export default TransactionHistory;
