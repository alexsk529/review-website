import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice.js'
import worksReducer from './worksSlice.js'
import reviewsReducer from './reviewsSlice.js'

import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer,
    works: worksReducer,
    reviews: reviewsReducer
});

const configs = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(configs, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});
export const persistor = persistStore(store);