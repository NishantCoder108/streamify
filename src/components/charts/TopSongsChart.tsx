import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { TopSong } from "../../types";

interface TopSongsChartProps {
  data: TopSong[];
  selectedSong: string | null;
  onSongClick: (song: string | null) => void;
}

const TopSongsChart: React.FC<TopSongsChartProps> = ({
  data,
  selectedSong,
  onSongClick,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 100,
          bottom: 5,
        }}
        onClick={(data) => {
          if (data && data.activePayload) {
            onSongClick(data.activePayload[0].payload.songName);
          }
        }}
        barSize={15}
        className="cursor-pointer"
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          type="number"
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          fontSize={14}
        />
        <YAxis
          padding={{ bottom: 30, top: 10 }}
          scale="point"
          type="category"
          dataKey="songName"
          tick={(props) => {
            console.log({ props });
            return (
              <text
                x={props.x}
                y={props.y}
                dy={5}
                textAnchor="end"
                fill={
                  selectedSong === props.payload.value ? "#4F46E5" : "#374151"
                }
                fontSize={14}
              >
                {props.payload.value}
              </text>
            );
          }}
        />

        <Tooltip
          formatter={(value: number) => `$${(value / 1000000).toFixed(2)}M`}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;

            // console.log({ active }, payload);

            return (
              <p
                className={`shadow-lg flex flex-col gap-3 rounded-lg p-2 bg-white outline-none border-none font-[500] text-[${payload[0].payload.fill}]`}
                style={{
                  color: payload[0].payload.fill,
                }}
              >
                <span>{payload[0].payload.songName}</span>
                <span style={{ color: payload[0].color }}>
                  {payload[0].name} : {payload[0].value}
                </span>
              </p>
            );
          }}
        />
        <Legend />
        <Bar
          dataKey="streams"
          name="Streams"
          fill="#4F46E5"
          cursor="pointer"
          activeBar={<Rectangle fill="#0000ff73" stroke="#0000ff73" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSongsChart;
