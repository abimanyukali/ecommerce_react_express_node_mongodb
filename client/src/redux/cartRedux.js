import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    decQuantity: (state, action) => {
      const { postId } = action.payload;
      const existQuantity = state.products.find((post) => post._id === postId);
      if (existQuantity) {
        if (existQuantity.quantity > 1) {
          existQuantity.quantity -= 1;
          state.quantity -= 1;
          state.total -= existQuantity.price;
        }
      }
    },
    incQuantity: (state, action) => {
      const { postId } = action.payload;
      console.log(postId);
      const existQuantity = state.products.find((post) => post._id === postId);
      console.log(existQuantity);
      if (existQuantity) {
        existQuantity.quantity += 1;
        state.quantity += 1;
        state.total += existQuantity.price;
      }
    },
    deleteProduct: (state, action) => {
      const { postId, index } = action.payload;
      const existQuantity = state.products.find((post) => post._id === postId);
     
      state.quantity -=existQuantity.quantity
      state.total -=existQuantity.price*existQuantity.quantity
      state.products = state.products.slice(index + 1);
    },
  },
});
export const { addProduct, decQuantity, incQuantity, deleteProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
