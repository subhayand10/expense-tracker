import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoPizzaOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { CiRollingSuitcase } from "react-icons/ci";
import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

const TransactionList = ({
  transactions,
  onEditExpense,
  isOpen,
  onRequestClose,
  onClick,
  deleteExpense,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {currentItems.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between mb-4"
        >
          {transaction.category == "Food" && <IoPizzaOutline />}
          {transaction.category == "Entertainment" && <GoGift />}
          {transaction.category == "Travel" && <CiRollingSuitcase />}
          {/* <GoGift /> */}
          {/* <CiRollingSuitcase /> */}
          <div className="flex-1 ml-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{transaction.title}</span>
              <span className="font-semibold pt-3 pr-2 text-[#F4BB4A]">
                &#8377; {transaction.amount}
              </span>
            </div>
            <div className="text-gray-500">{transaction.date}</div>
          </div>
          <div className="flex items-center space-x-2">
            {/* <FaEdit className="text-blue-500 cursor-pointer" />
            <FaTrash className="text-red-500 cursor-pointer" /> */}
            <button
              onClick={() => {
                deleteExpense(transaction.id);
              }}
            >
              <img src={deleteImg} />
            </button>
            <button
              onClick={() => {
                onClick("edit", transaction.id);
              }}
            >
              <img src={editImg} />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          <FaCircleArrowLeft />
        </button>
        <span className="px-4 py-2 bg-[#43967B] rounded-md text-white">
          {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          <FaCircleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
