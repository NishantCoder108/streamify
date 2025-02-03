import React, { act } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RevenueSource } from "../../types";

interface RevenueChartProps {
  data: RevenueSource[];
  selectedSource: string | null;
  onSourceClick: (source: string | null) => void;
}

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  selectedSource,
  onSourceClick,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
          nameKey="source"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          onClick={(entry) => onSourceClick(entry.source)}
          cursor="pointer"
          rootTabIndex={-1}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              opacity={
                selectedSource && selectedSource !== entry.source ? 0.5 : 1
              }
              stroke={selectedSource === entry.source ? "#fff" : undefined}
              strokeWidth={selectedSource === entry.source ? 2 : 1}
              style={{
                cursor: "pointer !important",
                outline: "none",
                fontWeight: 500,
              }}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value: number) => `$${(value / 1000000).toFixed(2)}M`}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;

            console.log({ active }, payload);

            return (
              <p
                className={`shadow-lg rounded-lg p-2 bg-white outline-none border-none font-[500] text-[${payload[0].payload.fill}]`}
                style={{
                  color: payload[0].payload.fill,
                }}
              >
                {payload[0].name} : {payload[0].value}
              </p>
            );
          }}
        />
        {/* <Legend
          onClick={(entry) => onSourceClick(entry.value)}
          cursor="pointer"
        /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
