export interface FilterOrder {
    user_id?: number;
    page?: number;
    pageSize?: number;
  }
  export interface Order {
  id: number;
  user_id: number;
  store_id: number;
  address_id: number;
  voucher_id: number;
  status: string;
  totalAmount: number;
  createdAt: Date;
  updateAt: Date;
  confirmed: Boolean;
}
