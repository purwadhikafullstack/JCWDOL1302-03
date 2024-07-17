export interface IDiscount {
  id: number;
  store_id: number;
  type: string;
  value: string;
  minPurchase: number;
  maxPurchase: number;
  startDate: Date;
  endDate: Date;
}
