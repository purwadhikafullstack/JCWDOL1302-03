export interface StoreReport {
  id: number;
  storeName: string;
  sales: number;
  month: string;
  year: number;
}

export interface StoreReportByCategory {
  id: number;
  storeName: string;
  categoryName: string;
  sales: number;
  year: number;
}

export interface StoreReportByProduct {
  id: number;
  storeName: string;
}
