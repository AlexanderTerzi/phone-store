import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

type ProductItemType = {
    id: number | string;
    title: string;
    imageUrl: string;
    alt: string;
    colors: string[];
    memory: {
        capacity: number;
        price: number;
    };
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface IProductsSliceState {
    items: ProductItemType[];
    itemsCount: number;
    status: Status;
}

interface IFetchProductsParams {
    fetchURL: string;
    category: string;
    sortBy: string;
    order: string;
    search: string;
    pagination: string;
}

export const fetchItems = createAsyncThunk(
    'products/fetchItems',
    async (params: IFetchProductsParams, thunkAPI) => {
        const { fetchURL, category, sortBy, order, search, pagination } = params;

        const res = await axios.get<{ items: ProductItemType[]; count: number }>(
            `${fetchURL}?${pagination}&${category}&${sortBy}&${order}&${search}`
        );

        if (res.data.items.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState: IProductsSliceState = {
    items: [],
    itemsCount: 0,
    status: Status.LOADING, //  loading || success || error
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<{ items: ProductItemType[]; count: number }>) {
            state.items = action.payload.items;
            state.itemsCount = action.payload.count;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<any>) => {
            state.items = action.payload.items;
            state.itemsCount = action.payload.count;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
});

export const selectProducts = (state: RootState) => state.products;

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;