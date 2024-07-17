export interface ICart {
  id?: number;
  user_id: number;
  totalAmount: number;
  store_id?: number;
}

export interface IUpdateCart {
  totalAmount?: number;
  store_id?: number;
}

export interface ICartItem {
  name: string;
  description: string;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
}
