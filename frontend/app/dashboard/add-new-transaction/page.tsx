import React from "react";
import { FcSurvey } from "react-icons/fc";

const AddNewTransaction = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FcSurvey />
          Add New Transaction
        </h2>

        <form className="max-w-xl my-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span>Amount*</span>
            <input
              required
              type="number"
              name="amount"
              id="amount"
              min={0.1}
              className="input input-bordered "
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
            />
          </div>

          <div className="flex flex-col gap-1">
            <span>Transaction Type*</span>
            <select
              required
              name="transaction_type"
              id="transaction_type"
              className="select select-bordered "
            >
              <option value="expense" defaultChecked>
                Expense
              </option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span>Category*</span>
            <select
              required
              name="category"
              id="category"
              className="select select-bordered "
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
            ></textarea>
          </div>

          <button className="btn btn-success text-white">Add New Entry</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTransaction;
