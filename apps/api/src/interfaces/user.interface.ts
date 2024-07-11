export interface User {
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
export interface UserLocation {
  longitude?: number | null;
  latitude?: number | null;
}
export interface UpdateUser {
  username: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  profilePicture: string;
  birthDate: Date;
}
