import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const TopExpenses = ({data}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <ResponsiveContainer width="100%" height={275}>
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" axisLine={false} tick={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="category"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenses;
