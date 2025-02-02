import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TopSong } from '../../types';

interface TopSongsChartProps {
  data: TopSong[];
  selectedSong: string | null;
  onSongClick: (song: string | null) => void;
}

const TopSongsChart: React.FC<TopSongsChartProps> = ({ 
  data,
  selectedSong,
  onSongClick
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
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <YAxis
          type="category"
          dataKey="songName"
          tick={{ 
            fontSize: 12,
            // fill: (value) => selectedSong === value ? '#4F46E5' : '#374151'
          }}
        />
        <Tooltip
          formatter={(value: number) => [`${(value / 1000000).toFixed(2)}M`, 'Streams']}
          cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
        />
        <Legend />
        <Bar
          dataKey="streams"
          name="Streams"
          fill="#4F46E5"
          // opacity={(entry) => selectedSong && selectedSong !== entry.songName ? 0.5 : 1}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSongsChart;