export interface IAdmin {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
}

export interface IFilterAdmin {
  email?: string;
  page?: number;
  pageSize?: number;
}
