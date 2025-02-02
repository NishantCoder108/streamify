import React, { useState, useMemo } from 'react';
import { Stream } from '../types';
import { ArrowUpDown, Search } from 'lucide-react';

interface DataTableProps {
  data: Stream[];
}

const DataTable: React.FC<DataTableProps> = React.memo(({ data }) => {
  const [sortField, setSortField] = useState<keyof Stream>('dateStreamed');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof Stream) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  
  const processedData = useMemo(() => {
    const filteredData = data.filter(stream => 
      stream.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stream.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filteredData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });
  }, [data, searchTerm, sortField, sortDirection]);

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by song or artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('songName')}
              >
                <div className="flex items-center">
                  Song Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('artist')}
              >
                <div className="flex items-center">
                  Artist
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('dateStreamed')}
              >
                <div className="flex items-center">
                  Date Streamed
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('streamCount')}
              >
                <div className="flex items-center">
                  Stream Count
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {processedData.map((stream) => (
              <tr 
                key={stream.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
                title={`${stream.songName} by ${stream.artist}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stream.songName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stream.artist}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(stream.dateStreamed).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stream.streamCount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable;