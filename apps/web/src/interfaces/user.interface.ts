export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  referralCode: string;
  name: string;
  gender: string;
  birthDate: string;
  role: string;
  profilePicture: string;
  claimedCode: string;
  longitude: number;
  latitude: number;
}

export interface Login {
  email: string;
  password: string;
}

export type Status = {
  isLogin: boolean;
};

export interface Auth {
  user: User;
  status: Status;
}

export interface Verified {
  password: string;
  confirmPassword: string;
}

export interface FilterUser {
  email?: string;
  page?: number;
  pageSize?: number;
}
