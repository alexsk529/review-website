import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js'

const initialState = {
    data: [],
    status: 'idle',
    toolbarStatus: 'idle',
    error: null
};

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
    const response = await axios.get('/api/admin/', {withCredentials: true});
    return response.data;
});

export const deleteAuthor = createAsyncThunk('authors/deleteAuthor', async (emails) => {
    const response = await axios.delete(`/api/admin/delete`, {data: emails, withCredentials: true});
    return response.data
})

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        authorsStatusRefreshed (state) {
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuthors.rejected, (state, action) =>{
                state.status = 'idle'
                state.error = action.error.message
            })
            .addCase(fetchAuthors.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.error = null
                state.data = action.payload
            })

            .addCase(deleteAuthor.pending, (state) => {
                state.toolbarStatus = 'deleting'
            })
            .addCase(deleteAuthor.rejected, (state, action) => {
                state.toolbarStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(deleteAuthor.fulfilled, (state, action) =>{
                state.toolbarStatus = 'idle'
                state.data = state.data.filter(author => !action.payload.emails.includes(author.email));
                state.error = null;
            })
    }
})

export default authorsSlice.reducer;

export const { authorsStatusRefreshed } = authorsSlice.actions;

export const selectAuthorsStatus = state => state.authors.status;

export const selectToolbarStatus = state => state.authors.toolbarStatus;

export const selectAuthors = state => state.authors.data;