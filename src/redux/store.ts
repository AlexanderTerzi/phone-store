import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import languageReducer from './slices/languageSlice';
import productsSlice from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        filter: filterSlice,
        cart: cartSlice,
        products: productsSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();