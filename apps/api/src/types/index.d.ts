export type User = {
  id: number;
  username: string;
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
};

export type Admin = {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
};

declare global {
  namespace Express {
    export interface Request {
      admin: Admin;
      user: User;
    }
  }
}
