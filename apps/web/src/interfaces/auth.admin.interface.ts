export interface Admin {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
}

export interface Login {
  email: string;
  password: string;
}

export type Status = {
  isLogin: boolean;
};

export interface AuthAdmin {
  admin: Admin;
  status: Status;
}
