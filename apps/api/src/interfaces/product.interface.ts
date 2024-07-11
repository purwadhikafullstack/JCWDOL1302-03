import { Product } from '@prisma/client';
export interface IProduct {
  admin_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
  stock: number;
}

export interface FilterProduct {
  name?: string;
  page?: number;
  pageSize?: number;
}

export interface ResultProduct {
  products: Product[];
  pages: number;
}
