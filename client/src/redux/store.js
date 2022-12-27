import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice.js'
import worksReducer from './worksSlice.js'

export default configureStore({
    reducer: {
        user: userReducer,
        works: worksReducer
    }
})