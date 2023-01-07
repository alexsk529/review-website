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

export const blockAuthor = createAsyncThunk('authors/blockAuthor', async (emails) => {
    const response = await axios.patch('/api/admin/change-status', {emails, status: 'blocked'}, {withCredentials: true})
    return response.data
})

export const unblockAuthor = createAsyncThunk('authors/unblockAuthor', async (emails) => {
    const response = await axios.patch('/api/admin/change-status', {emails, status: 'unblocked'}, {withCredentials: true})
    return response.data
})

export const makeAdmin = createAsyncThunk('authors/makeAdmin', async (emails) => {
    const response = await axios.patch('/api/admin/change-role', {emails, role: 'admin'}, {withCredentials: true})
    return response.data
})

export const makeUser = createAsyncThunk('authors/makeUser', async (emails) => {
    const response = await axios.patch('/api/admin/change-role', {emails, role: 'user'}, {withCredentials: true})
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

            .addCase(blockAuthor.pending, (state) => {
                state.toolbarStatus = 'blocking'
            })
            .addCase(blockAuthor.rejected, (state, action) => {
                state.toolbarStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(blockAuthor.fulfilled, (state, action) => {
                state.toolbarStatus = 'idle';
                state.data = action.payload.authors;
                state.error = null;
            })

            .addCase(unblockAuthor.pending, (state) => {
                state.toolbarStatus = 'unblocking'
            })
            .addCase(unblockAuthor.rejected, (state, action) => {
                state.toolbarStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(unblockAuthor.fulfilled, (state, action) => {
                state.toolbarStatus = 'idle';
                state.data = action.payload.authors;
                state.error = null;
            })

            .addCase(makeAdmin.pending, (state) => {
                state.toolbarStatus = 'admining'
            })
            .addCase(makeAdmin.rejected, (state, action) => {
                state.toolbarStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(makeAdmin.fulfilled, (state, action) => {
                state.toolbarStatus = 'idle';
                state.data = action.payload.authors;
                state.error = null;
            })

            .addCase(makeUser.pending, (state) => {
                state.toolbarStatus = 'usering'
            })
            .addCase(makeUser.rejected, (state, action) => {
                state.toolbarStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(makeUser.fulfilled, (state, action) => {
                state.toolbarStatus = 'idle';
                state.data = action.payload.authors;
                state.error = null;
            })
    }
})

export default authorsSlice.reducer;

export const { authorsStatusRefreshed } = authorsSlice.actions;

export const selectAuthorsStatus = state => state.authors.status;

export const selectToolbarStatus = state => state.authors.toolbarStatus;

export const selectAuthors = state => state.authors.data;