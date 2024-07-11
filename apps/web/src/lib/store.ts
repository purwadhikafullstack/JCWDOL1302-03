import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/lib/features/auth/authSlice';
import authAdminSlice from './features/auth/adminAuthSlice';
import cartSlice from './features/cart/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      authAdmin: authAdminSlice,
      cart: cartSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
