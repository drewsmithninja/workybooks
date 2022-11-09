import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import homeReducer from '../features/home/homepageSlice';
import searchReducer from '../features/search/searchpageSlice';
import userReducer from '../features/user/userSlice';
import libraryReducer from '../features/library/librarypageSlice';
import collectionReducer from '../features/collection/collectionSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  search: searchReducer,
  user: userReducer,
  library: libraryReducer,
  collection: collectionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: () => getDefaultMiddleware({
    serializableCheck: false
  })
});

// import { composeWithDevTools } from '@redux-devtools/extension';
// import { applyMiddleware, createStore } from 'redux';
// import rootReducer from './reducers/rootReducer';

// const thunk = require('redux-thunk').default;

// export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// export const persistor = persistStore(store);
