import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js'

const initialState = [];

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default authorsSlice.reducer;