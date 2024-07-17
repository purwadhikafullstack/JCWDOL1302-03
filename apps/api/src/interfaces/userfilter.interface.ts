import { User } from '@prisma/client';

export interface IUser {
  id: number;
  username: string | null;
  email: string;
  password: string;
  verified: boolean;
  referralCode: string;
  name: string;
  gender: string;
  birthDate: Date;
  role: string;
  profilePicture: string;
  claimedCode: string;
  longitude: number | null;
  latitude: number | null;
}

export interface FilterUser {
  email?: string;
  page?: number;
  pageSize?: number;
}

export interface IResultUser {
  users: User[];
  pages: number;
}
