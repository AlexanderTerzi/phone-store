import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        }
    }
});

export const { setActiveCategory, setActiveSort, setCurrentPage, setFilterParams } = filterSlice.actions;
export default filterSlice.reducer;