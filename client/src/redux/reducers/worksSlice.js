import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js'

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
            return action.payload
        })
    }
})

export default worksSlice.reducer

export const selectWorks = state => state.works.map(item => {
    const result = item.work_name;
    return result[0].toUpperCase() + result.slice(1)
});

export const selectCategories = state => {
    const groups = state.works.map(item => item.category);
    const unique = (arr) => {
        let result = [];
        arr.forEach(el => {
            !result.includes(el) && result.push(el)
        })
        result = result.map(item => item[0].toUpperCase() + item.slice(1))
        return result
    }
    return unique(groups) 
}

export const selectWorkByName = (state, workName) => state.works.find(work => work.work_name === workName )