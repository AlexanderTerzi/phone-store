import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
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
        removeItem(state, action) {
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
        minusItem(state, action) {
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
                return obj.count + sum
            }, 0)
        }
    }
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;