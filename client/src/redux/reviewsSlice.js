import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios.js'

const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const response = await axios.get('/');
    return response.data.data;
});

export const fetchReviewsByBestGrade = createAsyncThunk('reviews/fetchReviewsByBestGrade', async () => {
    const response = await axios.get('/best-grade');
    return response.data.data;
})

export const createReview = createAsyncThunk('reviews/createReview', async (review) => {
    const response = await axios.post('/api/review/create', { ...review }, { withCredentials: true });
    return response.data;
});

export const updateReview = createAsyncThunk('reviews/updateReview', async (review) => {
    const response = await axios.patch('/api/review/update', { ...review }, { withCredentials: true });
    return response.data;
});

export const deleteReviews = createAsyncThunk('reviews/deleteReviews', async (reviewsId) => {
    const response = await axios.delete(`/api/review/delete`, {data: reviewsId, withCredentials: true});
    return response.data
})

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        statusRefreshed(state) {
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.data = action.payload
                state.error = null
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.error.message
            })
            .addCase(fetchReviewsByBestGrade.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReviewsByBestGrade.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.data = action.payload
                state.error = null
            })
            .addCase(fetchReviewsByBestGrade.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.error.message
            })
            .addCase(createReview.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data = state.data.concat(action.payload.review)
            })
            .addCase(createReview.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.error.message
            })
            .addCase(updateReview.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.error.message
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.status = 'idle'
                const {id} = action.payload.review
                let existingPost = state.data.find(review => review.review_id === id);
                if (existingPost) existingPost = {...action.payload.review}
            })
            .addCase(deleteReviews.pending, (state) => {
                state.status = 'deleting'
            })
            .addCase(deleteReviews.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.error.message
            })
            .addCase(deleteReviews.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = state.data.filter(review => !action.payload.selected.includes(review.review_id));
            })
    }
})

export default reviewsSlice.reducer

export const { statusRefreshed } = reviewsSlice.actions;

export const selectAllReviews = state => state.reviews.data

export const selectReviewById = (state, reviewId) => state.reviews.data.find(review => review.review_id === reviewId)

export const selectReviewsByUserEmail = (state, authorEmail) => {
    const reviews = state.reviews.data.filter(review => review.email === authorEmail)
    reviews.sort((a, b) => a.review_id - b.review_id)
    return reviews
}
