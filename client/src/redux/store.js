import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userSlice.js';
import worksReducer from './reducers/worksSlice.js';
import reviewsReducer from './reducers/reviewsSlice.js';
import scrollReducer from './reducers/scrollSlice.js';
import modeReducer from './reducers/modeSlice.js';

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
    reviews: reviewsReducer,
    scroll: scrollReducer,
    mode: modeReducer
});

const configs = {
    key: 'root',
    storage,
    blacklist: ['user', 'scroll', 'mode']
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