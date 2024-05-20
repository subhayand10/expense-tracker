import React from "react";

const InfoCard = ({ title, amount, buttonText, onButtonClick,income }) => {
  return (
    <div className="bg-[#9B9B9B] shadow-md rounded-lg p-4 flex flex-col items-center p-11">
      <div className="flex justify-center items-center">
        <h2 className="text-lg font-semibold mb-2 text-white mr-2">{title}:</h2>
        <h2
          className="text-lg font-semibold mb-2"
          style={income ? { color: "#9DFF5B" } : { color: "#F4BB4A" }}
        >
          &#8377;
          {amount}
        </h2>
      </div>
      <button
        onClick={()=>{onButtonClick("add");}}
        style={
          income
            ? {
                background: "linear-gradient(90deg, #B5DC52 0%, #89E148 100%)",
              }
            : {
                background:
                  "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)",
              }
        }
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InfoCard;
