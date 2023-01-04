import { createSlice, current } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('mode')) || 'light'

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        toggleMode (state) {
            if (state === 'light') return 'dark'
            else return 'light'
        }
    }
})

export default modeSlice.reducer;

export const { toggleMode } = modeSlice.actions;