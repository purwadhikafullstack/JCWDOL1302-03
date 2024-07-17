export interface FilterProduct {
  name?: string;
  page?: number;
  pageSize?: number;
}

export interface Products {
  id: number;
  admin_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
}
