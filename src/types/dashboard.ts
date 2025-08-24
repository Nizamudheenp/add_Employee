// src/types/dashboard.ts
export interface TimelineSegment {
  label: string; // "Total Working hours", "Productive Hours", etc.
  value: string; // "12h 36m"
}

export interface DashStats {
  todayHours: string;     // "5/7hrs"
  weekHours: string;      // "35/42hrs"
  monthHours: string;     // "153/182hrs"
  overtimeHours: string;  // "25/182hrs"
  timeline: TimelineSegment[];
}

export interface LeaveSummary {
  totalAllowed: number;
  taken: number;
  absentDays: number;
  requests: number;
  workedDays: number;
  lossOfPay: number;
}
