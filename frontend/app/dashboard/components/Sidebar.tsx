import Link from "next/link";
import React from "react";
import { FcAreaChart } from "react-icons/fc";
import { FcSurvey } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
const sidebar_items = [
  {
    title: "New Transaction",
    url: "/dashboard/add-new-transaction",
    icon: <FcSurvey />,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <FcAreaChart />,
  },
  {
    title: "Transaction History",
    url: "/dashboard/transaction-history",
    icon: <FcViewDetails />,
  },
  // {
  //   title: "Expenses",
  //   url: "#",
  // },
  // {
  //   title: "Incomes",
  //   url: "#",
  // },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <FcSettings />,
  },
];

const Sidebar = () => {
  return (
    <div className="fixed">
      <h2 className="bg-yellow-400 rounded px-4 py-2 max-w-fit font-bold font-mono border-2 border-black">
        FinnBox
      </h2>

      <div className="flex flex-col gap-3 mt-8 px-1 ">
        {sidebar_items.map((item, key) => (
          <Link
            href={item.url}
            key={key}
            className="hover:cursor-pointer hover:underline flex gap-2 items-center"
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
