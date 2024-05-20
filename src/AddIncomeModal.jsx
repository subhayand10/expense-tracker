import React, { useState } from "react";
import Modal from "react-modal";

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

const AddIncomeModal = ({ isOpen, onRequestClose, onAddIncome }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount);
    onAddIncome(amount);
    onRequestClose();
    setAmount("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Income"
    >
      <h2 className="text-xl font-bold mb-4">Add Balance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/3">
            <input
              type="number"
              name="amount"
              value={amount}
              placeholder="Income Amount"
              onChange={(e) => setAmount(e.target.value)}
              className="placeholder-gray-500 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex gap-1 w-2/3">
            <button
              type="submit"
              className="px-4 py-2  text-white rounded w-full bg-[#F4BB4A] "
            >
              Add Balance
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="px-4 py-2 bg-gray-300 text-black rounded mr-2 w-1/2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddIncomeModal;
