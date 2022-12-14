import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axios.get('/api/author/get-author', { withCredentials: true })
    return response.data
})

export const logout = createAsyncThunk('user/logout', async () => {
    const response = await axios.post('/api/auth/logout', {}, { withCredentials: true })
    return response.data
})

export const updateUser = createAsyncThunk('user/update', async (name) => {
    const response = await axios.patch('/api/author/rename-author', { name: name })
    return response.data.subject
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                localStorage.removeItem('user')
                state.error = action.error.message
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.user = action.payload
                state.error = null
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = 'idle'
                state.user = action.payload.user;
                localStorage.removeItem('user')
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = {...state.user, ...action.payload};
                console.log(state.user);
                console.log(action.payload);
                localStorage.setItem('user', JSON.stringify({...state.user, ...action.payload}))
            })
    }
})

export default userSlice.reducer

export const selectUser = state => state.user.user;

export const selectUserEmail = state => state.user.user?.email;

export const selectUserRole = state => state.user.user?.role;

export const selectUserStatus = state => state.user.user?.status;

export const selectUserRateOnWork = (state, work_name) => {
    let instance;
    if (state.user.user) {
    instance = state.user.user?.rates.find(rate => rate.work_name === work_name);
    }
    return instance?.rate
}

export const selectUserLikesOnReview = (state, review_id) => {
    let instance;
    if (state.user.user) {
        instance = state.user.user?.likes.find(like => like.review_id == review_id);
    }
    return instance
}
