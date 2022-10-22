import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        setActiveCategory(state, action) {
            state.activeCategory = action.payload;
        },
        setActiveSort(state, action) {
            state.activeSort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilterParams(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.activeCategory = Number(action.payload.activeCategory);
            state.activeSort = action.payload.activeSort;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        }
    }
});

export const { setActiveCategory, setActiveSort, setCurrentPage, setFilterParams, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;