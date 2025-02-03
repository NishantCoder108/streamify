import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MonthlyStats } from "../../types";

interface UserGrowthChartProps {
  data: MonthlyStats[];
  selectedMonth: string | null;
  onMonthClick: (month: string | null) => void;
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({
  data,
  selectedMonth,
  onMonthClick,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        onClick={(data) => {
          if (data && data.activePayload) {
            onMonthClick(data.activePayload[0].payload.month);
          }
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          interval={1}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        {/* <Tooltip
          formatter={(value: number) => [
            `${(value / 1000000).toFixed(2)}M`,
            'Users'
          ]}



          cursor={{ strokeDasharray: '3 3' }}
          // wrapperStyle={{
          //   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          //   // borderRadius: '4px',
          //   border:"none",
          //   outline: "none",
          //   backgroundColor: "#000 !important",
          // }}        
           
        /> */}

        <Tooltip
          formatter={(value: number) => `$${(value / 1000000).toFixed(2)}M`}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;

            console.log({ active }, payload);

            return (
              <p
                className={`shadow-lg flex flex-col items-between justify-between gap-3 rounded-lg p-2 bg-white outline-none border-none font-[500] text-[${payload[0].payload.fill}]`}
              >
                <span
                  style={{
                    color: payload[0].color,
                  }}
                >
                  {payload[0].name} : {payload[0].value}{" "}
                </span>
                <span
                  style={{
                    color: payload[1].color,
                  }}
                >
                  {payload[1].name} : {payload[1].value}
                </span>
              </p>
            );
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalUsers"
          name="Total Users"
          stroke="#4F46E5"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            fill: selectedMonth ? "#4F46E5" : "rgba(79, 70, 229, 0.5)",
            stroke: selectedMonth ? "#fff" : undefined,
          }}
        />
        <Line
          type="monotone"
          dataKey="activeUsers"
          name="Active Users"
          stroke="#10B981"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            fill: selectedMonth ? "#10B981" : "rgba(16, 185, 129, 0.5)",
            stroke: selectedMonth ? "#fff" : undefined,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart;
