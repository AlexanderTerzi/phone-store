import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchItems = createAsyncThunk(
    'products/fetchItems',
    async (params, thunkAPI) => {
        const { fetchURL, category, sortBy, order, search, pagination } = params;

        const res = await axios.get(
            `${fetchURL}?${pagination}&${category}&${sortBy}&${order}&${search}`
        );

        if (res.data.items.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState = {
    items: [],
    itemsCount: 0,
    status: 'loading', //  loading || success || error
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.items = action.payload.items;
            state.itemsCount = action.payload.count;
            state.status = 'success';
        },
        [fetchItems.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const { } = productsSlice.actions;
export default productsSlice.reducer;