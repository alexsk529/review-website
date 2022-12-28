import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice.js'
import worksReducer from './worksSlice.js'
import reviewsReducer from './reviewsSlice.js'

export default configureStore({
    reducer: {
        user: userReducer,
        works: worksReducer,
        reviews: reviewsReducer
    }
})