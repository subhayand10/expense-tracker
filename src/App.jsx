import React, { useState,useEffect } from "react";
import InfoCard from "./InfoCard";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import TransactionList from "./TransactionList";
import TopExpenses from "./TopExpenses";
import AddExpenseModal from "./AddExpenseModal";
import AddIncomeModal from "./AddIncomeModal";
import data from "./data";

const COLORS = ["#A000FF", "#FF9304", "yellow"];

const App = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [balance, setBalance] = useState(4650);
  const [expenseData, setExpenseData] = useState(data);
  const [totExpenses, setTotExpenses] = useState(0);
  const [type, setType] = useState("");
  const [editId, setEditId] = useState("");



  const handleAddExpense = (type,editId) => {
    setEditId(editId);
    setType(type);
    setIsExpenseModalOpen(true);

  };

  const handleAddIncome = () => {
    setIsIncomeModalOpen(true);
  };

  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
    setEditId("");
  };

  const closeIncomeModal = () => {
    setIsIncomeModalOpen(false);
  };
  function formatDate(inputDate) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [year, month, day] = inputDate.split("-");
    const monthName = months[parseInt(month) - 1];
    return `${monthName} ${parseInt(day)}, ${year}`;
  }

  const addExpense = (formData) => {
   let newData={...formData,date:formatDate(formData.date)};
   console.log(newData);
    if(editId){
      const expense = expenseData.find((expense) => expense.id === editId);
      const index = expenseData.indexOf(expense);
      expenseData[index] = newData;
      setExpenseData([...expenseData]);
      setEditId("");
    }
    else{
      console.log("New Expense:", formData);
      console.log(formData);
      if(formData.amount<=balance ){
        setExpenseData((expenseData) => [...expenseData, newData]);
        setBalance((balance) => balance - formData.amount);
      }
      else{
        alert("Insufficient Balance");
      }
    }
  };

  const addIncome = (amount) => {
    // Logic to add income
    setBalance((balance) => balance + parseInt(amount));
    closeIncomeModal();
  };
  console.log(expenseData);

  const editExpense = (expense) => {
    // Logic to edit expense
  }
  const deleteExpense = (id) => {
    const expense = expenseData.find((expense) => expense.id === id);
    const index = expenseData.indexOf(expense);
    expenseData.splice(index, 1);
    setExpenseData([...expenseData]);
    //setBalance((balance) => balance + parseInt(expense.amount));
  }

  // Aggregate data by category
  const aggregatedData = expenseData.reduce((acc, curr) => {
    const category = curr.category;
    const amount = parseInt(curr.amount);
    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }
    return acc;
  }, {});
  console.log(aggregatedData); 

  // Convert aggregatedData to array for the pie chart
  const pieChartData = Object.keys(aggregatedData).map((category) => ({
    category,
    amount: aggregatedData[category],
  }));

  useEffect(() =>{
    const tot=expenseData.reduce((acc,curr) => {
      return acc+parseInt(curr.amount);
    },0);
    setTotExpenses(tot);
  },[expenseData]);
  //  useEffect(() => {
  //    setBalance((balance) =>{ return balance-totExpenses})
  //  }, []);

  return (
    <div className="min-h-screen bg-[#3B3B3B] p-4 ">
      <header className="text-white text-2xl font-bold mb-4">
        Expense Tracker
      </header>
      <div className=" px-4 bg-[#626262] rounded-lg shadow-md ">
        <div className="flex flex-wrap -mx-2 items-center">
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0 ">
            <InfoCard
              title="Wallet Balance"
              amount={balance}
              buttonText="+ Add Income"
              onButtonClick={handleAddIncome}
              income={true}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <InfoCard
              title="Expenses"
              amount={totExpenses}
              buttonText="+ Add Expense"
              onButtonClick={handleAddExpense}
              income={false}
            />
          </div>
          <div className="w-full md:w-1/3 px-2">
            <div className="bg-transparent  rounded-lg p-4">
              <PieChart width={300} height={300}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  nameKey="category"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <header className="text-white text-2xl font-bold mb-4 mt-2 italic">
            Recent Transactions
          </header>
          <TransactionList
            transactions={expenseData}
            isOpen={isExpenseModalOpen}
            onRequestClose={closeExpenseModal}
            onEditExpense={editExpense}
            type="edit"
            onClick={handleAddExpense}
            deleteExpense={deleteExpense}
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <header className="text-white text-2xl font-bold mb-4 mt-2 italic">
            Top Expenses
          </header>
          <TopExpenses data={expenseData}/>
        </div>
      </div>
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onRequestClose={closeExpenseModal}
        onAddExpense={addExpense}
        type={type}
      />
      <AddIncomeModal
        isOpen={isIncomeModalOpen}
        onRequestClose={closeIncomeModal}
        onAddIncome={addIncome}
        type="income"
      />
    </div>
  );
};

export default App;
