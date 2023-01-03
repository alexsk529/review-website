import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    status: 'idle',
    page: 1
}

export const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        loadMore(state, action) {
            const startIndex = (state.page - 1) * action.payload.limit;
            const endIndex = state.page * action.payload.limit;
            state.data.length < action.payload.data.length && (state.data=[...state.data, ...action.payload.data.slice(startIndex, endIndex)]);
            state.data.length < action.payload.data.length && (state.page +=1);
            state.data.length < action.payload.data.length ? state.status = 'idle' : state.status = 'success';
        },
        resetScroll (state) {
            console.log('reset');
            state.status = 'idle';
            state.page = 1;
            state.data = [];
        }
    }
})

export default scrollSlice.reducer;

export const { loadMore, resetScroll } = scrollSlice.actions;

export const selectScroll = state => state.scroll.data;

export const selectScrollStatus = state => state.scroll.status;