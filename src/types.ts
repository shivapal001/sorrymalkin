export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
}

export interface AppConfig {
  gfName: string;
  bfName: string;
  sorryLetter: string;
  songUrl: string;
  customPhoto: string; // Base64 or placeholder URL
  memories: MemoryItem[];
}

export interface GiftStatus {
  roseReceived: boolean;
  hugReceived: boolean;
  chocolateReceived: boolean;
  starrySkyActive: boolean;
}
