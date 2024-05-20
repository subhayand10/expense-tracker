
import React, { useState } from "react";
import Modal from "react-modal";

const categories = ["Select a category","Food", "Entertainment", "Travel"];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    maxWidth: "100%",
    background: "#EFEFEFD9",
  },
};

Modal.setAppElement("#root");

const AddExpenseModal = ({ isOpen, onRequestClose, onEditExpense,onAddExpense,type }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState("");
  // const [id, setId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      title,
      amount,
      category,
      date,
      id: generateTimestampId(),
    };
    console.log(newExpense)
    onAddExpense(newExpense);
    onRequestClose();
    setTitle("");
    setAmount("");
    setCategory(categories[0]);
    setDate("");
  };
    const generateTimestampId = () => {
      return Date.now().toString();
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={type == "edit" ? "Edit Expense" : "Add Expense"}
    >
      <h2 className="text-xl font-bold mb-4">
        {type == "edit" ? "Edit Expense" : "Add Expenses"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="placeholder-gray-500 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="w-1/2">
            <input
              type="number"
              value={amount}
              placeholder="Price"
              onChange={(e) => setAmount(e.target.value)}
              className="placeholder-gray-500 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {categories.map((cat, index) => {
                if (index == 0)
                  return (
                    <option key={cat} value={cat} selected disabled>
                      {cat}
                    </option>
                  );
                else {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="w-1/2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="flex justify-start gap-1">
          <button
            type="submit"
            className="px-4 py-2 bg-[#F4BB4A] rounded-lg text-white rounded"
          >
            {type == "edit" ? "Edit Expense" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 text-black rounded mr-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
