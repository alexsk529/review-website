import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios.js'

export const fetchWorks = createAsyncThunk('works/fetchWorks', async () => {
    const works = await axios.get('/api/work/get-works', {withCredentials: true})
    return works.data
})

const worksSlice = createSlice({
    name: 'works',
    initialState: [],
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchWorks.fulfilled, (state, action) => {
            state = action.payload
        })
    }
})

export default worksSlice.reducer

export const selectWorks = state => state.works.map(item => item.work_name);

export const selectCategories = state => {
    const groups = state.works.map(item => item.category);
    const unique = (arr) => {
        const result = [];
        arr.forEach(el => {
            !result.includes(el) && result.push(el)
        })
        return result
    }
    return unique(groups) 
}