import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload ?? '';
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = productSlice.actions;

export const selectSearchQuery = (state) => state.products.searchQuery;

export default productSlice.reducer;
