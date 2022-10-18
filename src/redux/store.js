import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        filter: filterSlice,
        cart: cartSlice
    },
})