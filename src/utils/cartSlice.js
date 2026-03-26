import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ id, title, price, thumbnail, quantity }]
};

const cartSlice = createSlice({
  name: 'cart',
  initialStae,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if (!product?.id) return;

      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return;
      existing.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return;
      existing.quantity = Math.max(1, existing.quantity - 1);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

export default cartSlice.reducer;
