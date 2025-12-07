export interface Drawing {
  id: string;
  username: string;
  digit: number;
  imageData: number[];
  timestamp: string;
}

export interface User {
  count: number;
  joinedAt: string;
}

export interface UserData {
  [username: string]: User;
}

export interface LeaderboardEntry {
  username: string;
  count: number;
  rank: number;
}

export interface AdminStats {
  totalDrawings: number;
  totalUsers: number;
  avgPerUser: number;
  digitCounts: { [digit: number]: number };
}
