export interface IAddress {
  id: number;
  user_id: number;
  // address: string
  city: string;
  // state: string
  postalCode: string;
  country: string;
  // latitude: string
  // longitude: string
  isPrimary: boolean;
  province: string;
  subdistrict: string;
}
