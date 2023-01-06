import { createSlice } from '@reduxjs/toolkit';

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: 1,
    reducers: {
        changeIndex(state,action) {
            return action.payload
        }
    }
})

export default selectedSlice.reducer;

export const { changeIndex } = selectedSlice.actions