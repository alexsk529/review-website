import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios.js'

const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchReviews = createAsyncThunk('reviews/fetchAllReviews', async() => {
    const response = await axios.get('/');
    return response.data;
});

export const fetchReviewsByBestRate = createAsyncThunk('reviews/fetchReviewsByBestRate', async() => {
    const response = await axios.get('/best-rate');
    return response.data;
})

export const createReview = createAsyncThunk('reviews/createReview', async(review) => {
    const response = await axios.post('/api/review/create', {review}, {withCredentials: true});
    return response.data;
});

export const updateReview = createAsyncThunk('reviews/updateReview', async(review) => {
    const response = await axios.patch('/api/review/update', {review}, {withCredentials: true});
    return response.data;
});

export const deleteReview = createAsyncThunk('reviews/deleteReview', async (reviewId) => {
    const response = await axios.delete(`/api/review/:${reviewId}`);
    return response.data
})

export 

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createReview.fulfilled, (state, action) => {
                //state.reviews.data = state.reviews.data.concat(action.payload)
                console.log('succeded');
                console.log(action);
            })
            .addCase(createReview.rejected, (state, action) => {
                //state.error = action.error.message
                console.log('rejected');
                console.log(action);
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const { review_id: id, work_name, review_title, content, image_url, rate } = action.payload;
                const existingPost = state.reviews.data.find(review => review.review_id === id);
                if (existingPost) {
                    existingPost.work_name = work_name;
                    existingPost.review_title = review_title;
                    existingPost.content = content;
                    existingPost.image_url = image_url;
                    existingPost.rate = rate;
                }
            })
    }
})

export default reviewsSlice.reducer

export const getAllReviews = state => state.reviews.data

export const getReviewById = (state,reviewId) => state.reviews.data.find(review => review.review_id === reviewId)

export const getReviewByUserEmail = (state, authorEmail) => state.reviews.data.find (review => review.author_email === authorEmail)