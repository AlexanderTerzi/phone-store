import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
    id: number | string;
    title: string;
    currentPrice: number;
    imageUrl: string;
    alt: string;
    color: string;
    memory: number;
    count: number;
}

interface ICartSliceState {
    totalPrice: number;
    totalCount: number;
    items: CartItemType[];
}

const initialState: ICartSliceState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => {
                return obj.id === action.payload.id && obj.color === action.payload.color && obj.memory === action.payload.memory;
            });

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.currentPrice * obj.count) + sum;
            }, 0);

            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
        },
        removeItem(state, action: PayloadAction<CartItemType>) {
            state.items = state.items.filter(obj => {
                return obj.id !== action.payload.id || obj.color !== action.payload.color || obj.memory !== action.payload.memory;
            });

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.currentPrice * obj.count) + sum;
            }, 0);

            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
        minusItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => {
                return obj.id === action.payload.id && obj.color === action.payload.color && obj.memory === action.payload.memory;
            });

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.currentPrice * obj.count) + sum;
            }, 0);

            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0)
        }
    }
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;