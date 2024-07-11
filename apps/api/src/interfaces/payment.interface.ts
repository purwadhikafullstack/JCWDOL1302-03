export interface IPayment {
  id: number;
  order_id: number;
  method: string;
  status: string;
  proof: string;
}
