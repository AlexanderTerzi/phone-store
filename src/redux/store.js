import { configureStore } from '@reduxjs/toolkit';
import i18nReducer from './slices/i18nextSlice';

export const store = configureStore({
    reducer: {
        i18n: i18nReducer
    },
})