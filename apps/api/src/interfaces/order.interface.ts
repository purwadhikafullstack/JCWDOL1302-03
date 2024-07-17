import { Order } from "@prisma/client"

export interface IOrder {
    user_id: number
    store_id: number
    address_id: number
    voucher_id: number
    status: string
    totalAmount: number
    createdAt: Date
    updateAt: Date
    admin_id: number
}

export interface FilterOrder {
    user_id?: string;
    page?: number;
    pageSize?: number;
  }
  
  export interface ResultOrder {
    order: Order[];
    pages: number;
  }