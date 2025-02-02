import React, { useState, Suspense, useMemo } from 'react';
import {
  Users,
  UserCheck,
  Music2,
  DollarSign,
  Crown,
  LayoutDashboard
} from 'lucide-react';
import MetricCard from './components/MetricCard';

const DataTable = React.lazy(() => import('./components/DataTable'));
const UserGrowthChart = React.lazy(() => import('./components/charts/UserGrowthChart'));
const RevenueChart = React.lazy(() => import('./components/charts/RevenueChart'));
const TopSongsChart = React.lazy(() => import('./components/charts/TopSongsChart'));

import { streams, revenueSources, topSongs, monthlyStats } from './data/mockData';


const ChartLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedRevenue, setSelectedRevenue] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const filteredStreams = useMemo(() => {
    return streams.filter((stream) => {
      if (selectedMonth) {
        const streamMonth = new Date(stream.dateStreamed).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (streamMonth !== selectedMonth) return false;
      }
      if (selectedSong && stream.songName !== selectedSong) return false;
      return true;
    });
  }, [selectedMonth, selectedSong]);

  const handleMonthClick = useMemo(() => (month: string | null) => {
    setSelectedMonth(month === selectedMonth ? null : month);
    setSelectedRevenue(null);
    setSelectedSong(null);
  }, [selectedMonth]);

  const handleRevenueClick = useMemo(() => (source: string | null) => {
    setSelectedRevenue(source === selectedRevenue ? null : source);
    setSelectedMonth(null);
    setSelectedSong(null);
  }, [selectedRevenue]);

  const handleSongClick = useMemo(() => (song: string | null) => {
    setSelectedSong(song === selectedSong ? null : song);
    setSelectedMonth(null);
    setSelectedRevenue(null);
  }, [selectedSong]);

  const metricCards = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">


    <MetricCard
      title="Total Users"
      value="1.2M"
      icon={Users}
      trend="+4.3%"
      trendUp={true}
    />


      <MetricCard
        title="Active Users"
        value="980K"
        icon={UserCheck}
        trend="+6.5%"
        trendUp={true}
      />
      <MetricCard
        title="Total Streams"
        value="45.2M"
        icon={Music2}
        trend="+12.3%"
        trendUp={true}
      />
      <MetricCard
        title="Revenue"
        value="$19.2M"
        icon={DollarSign}
        trend="+8.7%"
        trendUp={true}
      />
      <MetricCard
        title="Top Artist"
        value="Luna Ray"
        icon={Crown}
        trend="2.1M streams"
        trendUp={true}
      />
    </div>
  ), []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Streamify Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

    
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className='h-9'>


       
        {(selectedMonth || selectedRevenue || selectedSong) && (
          <div className="mb-6  flex flex-wrap gap-2">
            {selectedMonth && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                Month: {selectedMonth}
                <button
                  onClick={() => setSelectedMonth(null)}
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                >
                  ×
                </button>
              </span>
            )}
            {selectedRevenue && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Revenue: {selectedRevenue}
                <button
                  onClick={() => setSelectedRevenue(null)}
                  className="ml-2 text-green-600 hover:text-green-900"
                >
                  ×
                </button>
              </span>
            )}
            {selectedSong && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Song: {selectedSong}
                <button
                  onClick={() => setSelectedSong(null)}
                  className="ml-2 text-yellow-600 hover:text-yellow-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )} </div>

        {metricCards}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
            <div className="h-64">
              <Suspense fallback={<ChartLoader />}>
                <UserGrowthChart 
                  data={monthlyStats} 
                  selectedMonth={selectedMonth}
                  onMonthClick={handleMonthClick}
                />
              </Suspense>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h2>
            <div className="h-64">
              <Suspense fallback={<ChartLoader />}>
                <RevenueChart 
                  data={revenueSources}
                  selectedSource={selectedRevenue}
                  onSourceClick={handleRevenueClick}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Streamed Songs</h2>
          <div className="h-64">
            <Suspense fallback={<ChartLoader />}>
              <TopSongsChart 
                data={topSongs}
                selectedSong={selectedSong}
                onSongClick={handleSongClick}
              />
            </Suspense>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Streams</h2>
          <Suspense fallback={<ChartLoader />}>
            <DataTable data={filteredStreams} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;