import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortType = {
    name: string;
    sortProperty: string;
}

export interface IFilterSliceState {
    searchValue: string;
    activeCategory: number;
    currentPage: number;
    itemsPerPage: number;
    activeSort: SortType;
}

const initialState: IFilterSliceState = {
    searchValue: '',
    activeCategory: 0,
    currentPage: 1,
    itemsPerPage: 8,
    activeSort: {
        name: "default",
        sortProperty: '-rating'
    }
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload;
        },
        setActiveSort(state, action: PayloadAction<SortType>) {
            state.activeSort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilterParams(state, action: PayloadAction<IFilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.activeCategory = Number(action.payload.activeCategory);
            state.activeSort = action.payload.activeSort;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    }
});

export const selectFilter = (state: RootState) => state.filter;

export const { setActiveCategory, setActiveSort, setCurrentPage, setFilterParams, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;