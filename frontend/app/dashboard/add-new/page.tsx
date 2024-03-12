"use client";
import { transactions } from "@/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FcSurvey } from "react-icons/fc";
import React, { FormEvent, useState } from "react";

const AddNewTransaction = () => {

  // State.
  const [amount, setAmount] = useState<number>(0);
  const [sourceDest, setSourceDest] = useState("");
  const [transactionType, setTransactionType] = useState<"INCOME" | "EXPENSE">(
    "EXPENSE"
  );
  const [transactionMethod, setTransactionMethod] = useState<string>("UPI Lite");
  const [category, setCategory] = useState("Basic Necessities");
  const [notes, setNotes] = useState("");

  // Router.
  const router = useRouter();

  // Form submissions.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      amount: amount,
      category,
      notes,
      source_destination: sourceDest,
      transaction_method: transactionMethod,
      transaction_type: transactionType,
    };

    try {
      const resp = await transactions.createTransaction(payload);
      toast(resp?.message);
      // router.push(`/dashboard/transaction/${resp?.data.transaction.id}`);
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FcSurvey />
          Add New Transaction
        </h2>

        <form
          className="max-w-xl my-4 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <span>Amount*</span>
            <input
              required
              type="number"
              name="amount"
              id="amount"
              min={1}
              className="input input-bordered "
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span>Source / Destination*</span>
            <input
              required
              type="text"
              name="source_destination"
              id="source_destination"
              min={0.1}
              className="input input-bordered "
              onChange={(e) => setSourceDest(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span>Transaction Type*</span>
            <select
              required
              name="transaction_type"
              id="transaction_type"
              className="select select-bordered "
              value="EXPENSE"
              onChange={(e: any) => setTransactionType(e.target.value)}
            >
              <option value="EXPENSE" >
                Expense
              </option>
              <option value="INCOME">Income</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span>Transaction Method*</span>
            <select
              required
              name="transaction_method"
              id="transaction_method"
              className="select select-bordered "
              value={transactionMethod}
              onChange={(e) => setTransactionMethod(e.target.value)}
            >
              <option value="UPI Lite" >
                UPI Lite
              </option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span>Category*</span>
            <select
              required
              name="category"
              id="category"
              className="select select-bordered "
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Basic Necessities">Food</option>
              <option value="Utilities"> Utilities</option>
              <option value="Transportation"> Transportation</option>
              <option value="Healthcare"> Healthcare</option>
              <option value="Education"> Education</option>
              <option value="Entertainment"> Entertainment</option>
              <option value="Investments"> Investments</option>
              <option value="Savings"> Savings</option>
              <option value="Debt Repayment"> Debt Repayment</option>
              <option value="Charity/Donations"> Charity/Donations</option>
              <option value="Personal Care"> Personal Care</option>
              <option value="Home Expenses"> Home Expenses</option>
              <option value="Technology"> Technology</option>
              <option value="Dining Out"> Dining Out</option>
              <option value="Pets"> Pets</option>
              <option value="Hobbies"> Hobbies</option>
              <option value="Gifts"> Gifts</option>
              <option value="Legal Expenses"> Legal Expenses</option>
              <option value="Travel"> Travel</option>
              <option value="Insurance Premiums"> Insurance Premiums</option>
              <option value="Other"> Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span>Notes</span>
            <textarea
              name="notes"
              id="notes"
              rows={2}
              className="textarea textarea-bordered"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button className="btn btn-success text-white" type="submit">
            Add New Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTransaction;
