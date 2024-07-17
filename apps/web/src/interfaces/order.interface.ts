export interface FilterOrder {
  user_id?: number;
  page?: number;
  pageSize?: number;
}
interface OrderItem {
  id: number;
  order_id: number;
  quantity: number;
  price: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  gender: string;
  birthDate: string;
  role: string;
  profilePicture: string;
  longitude: number;
  latitude: number;
}

export interface Store {
  id: number;
  admin_id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  createdDate: string;
  updatedDate: string;
}

export interface Order {
  id: number;
  user_id: number;
  store_id: number;
  address_id: number;
  voucher_id: number;
  status: string;
  totalAmount: number;
  orderItem: OrderItem[];
  createdAt: Date;
  updateAt: Date;
  confirmed: Boolean;
  user: User;
  store: Store;
}
