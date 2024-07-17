import { Inventory } from '@prisma/client';
export interface IStock {
    id: number
    store_id: number
    product_id: number
    description: string
    quantity: number
}


export interface FilterStock {
  product_id?: number;
  page?: number;
  pageSize?: number;
}

export interface ResultStock {
  stock: Inventory[];
  pages: number;
}