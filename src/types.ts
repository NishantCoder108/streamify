export interface Stream {
    id: string;
    songName: string;
    artist: string;
    dateStreamed: string;
    streamCount: number;
  }
  
  export interface RevenueSource {
    source: string;
    amount: number;
    percentage: number;
  }
  
  export interface TopSong {
    songName: string;
    artist: string;
    streams: number;
  }
  
  export interface MonthlyStats {
    month: string;
    totalUsers: number;
    activeUsers: number;
  }