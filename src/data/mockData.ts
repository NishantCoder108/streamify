import { Stream, RevenueSource, TopSong, MonthlyStats } from "../types";

export const streams: Stream[] = [
  {
    id: "1",
    songName: "Summer Nights",
    artist: "Luna Ray",
    dateStreamed: "2024-03-14",
    streamCount: 1250000,
  },
  {
    id: "2",
    songName: "Midnight Drive",
    artist: "The Wanderers",
    dateStreamed: "2024-03-13",
    streamCount: 980000,
  },
  {
    id: "3",
    songName: "Electric Dreams",
    artist: "Neon Pulse",
    dateStreamed: "2024-03-12",
    streamCount: 875000,
  },
  {
    id: "4",
    songName: "Ocean Waves",
    artist: "Luna Ray",
    dateStreamed: "2024-03-11",
    streamCount: 750000,
  },
  {
    id: "5",
    songName: "City Lights",
    artist: "Urban Echo",
    dateStreamed: "2024-03-10",
    streamCount: 720000,
  },
];

export const revenueSources: RevenueSource[] = [
  { source: "Memberships", amount: 12500000, percentage: 65 },
  { source: "Ad Revenue", amount: 4500000, percentage: 23 },
  { source: "Merchandise", amount: 1500000, percentage: 8 },
  { source: "Live Events", amount: 750000, percentage: 4 },
];

export const topSongs: TopSong[] = [
  { songName: "Summer Nights", artist: "Luna Ray", streams: 1250000 },
  { songName: "Midnight Drive", artist: "The Wanderers", streams: 980000 },
  { songName: "Electric Dreams", artist: "Neon Pulse", streams: 875000 },
  { songName: "Ocean Waves", artist: "Luna Ray", streams: 750000 },
  { songName: "City Lights", artist: "Urban Echo", streams: 720000 },
];

export const monthlyStats: MonthlyStats[] = [
  { month: "Mar 2024", totalUsers: 1200000, activeUsers: 980000 },
  { month: "Feb 2024", totalUsers: 1150000, activeUsers: 920000 },
  { month: "Jan 2024", totalUsers: 1100000, activeUsers: 850000 },
  { month: "Dec 2023", totalUsers: 1000000, activeUsers: 800000 },
  { month: "Nov 2023", totalUsers: 950000, activeUsers: 750000 },
  { month: "Oct 2023", totalUsers: 900000, activeUsers: 700000 },
  { month: "Sep 2023", totalUsers: 850000, activeUsers: 650000 },
  { month: "Aug 2023", totalUsers: 800000, activeUsers: 600000 },
  { month: "Jul 2023", totalUsers: 750000, activeUsers: 550000 },
  { month: "Jun 2023", totalUsers: 700000, activeUsers: 500000 },
  { month: "May 2023", totalUsers: 650000, activeUsers: 450000 },
  { month: "Apr 2023", totalUsers: 600000, activeUsers: 400000 },
];
