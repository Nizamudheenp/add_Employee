
export interface MonthlyData {
  month: string;  
  count: number;   
}

export interface AnalyticsStats {
  overall: number;     
  monthly: MonthlyData[];  
}
