import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from '../../axios.js'

export const fetchWorks = createAsyncThunk('works/fetchWorks', async () => {
    const works = await axios.get('/api/work/get-works', { withCredentials: true })
    return works.data
})

export const hitRate = createAsyncThunk('works/hitRate', async (obj) => {
    const response = await axios.patch('/api/work/rate', { ...obj }, { withCredentials: true });
    return response.data;
})

const worksSlice = createSlice({
    name: 'works',
    initialState: [],
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchWorks.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(hitRate.fulfilled, (state, action) => {
            const { work_name } = action.payload;
            let existingWork = state.find(work => work.work_name === work_name);
            if (existingWork) existingWork = { ...action.payload };
            return state.map(work => {
                if (work.work_name === work_name) return existingWork
                else return work
            })
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

export const selectWorkByName = (state, workName) => state.works.find(work => work.work_name === workName)