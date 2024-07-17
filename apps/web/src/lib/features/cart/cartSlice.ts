import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

interface Cart {
  itemsCount: number;
  store_id: number;
  totalAmount: number;
}

const cartState = {
  itemsCount: 0,
  store_id: 0,
  totalAmount: 0,
} as Cart;

const initialState = (
  typeof window !== 'undefined' && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || JSON.stringify(cartState))
    : cartState
) as Cart;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartItemsState: (
      state: Cart,
      action: PayloadAction<{ itemsCount: number; totalAmount: number }>,
    ) => {
      state.itemsCount = action.payload.itemsCount;
      state.totalAmount = action.payload.totalAmount;
      return updateCart(state);
    },
    updateCartStoreState: (
      state: Cart,
      action: PayloadAction<{ store_id: number }>,
    ) => {
      state.store_id = action.payload.store_id;
      return updateCart(state);
    },
  },
});

const updateCart = (state: Cart) => {
  state.totalAmount = Number(state.totalAmount);
  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};

export const { updateCartItemsState, updateCartStoreState } = cartSlice.actions;

export default cartSlice.reducer;
