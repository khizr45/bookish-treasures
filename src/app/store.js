import {configureStore} from '@reduxjs/toolkit';
import Cart from '../app/features/Cart/CartSlice'
export const store = configureStore({
    reducer: Cart
});