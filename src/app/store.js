import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';
import homeReducer from './features/home/homepageSlice';
import searchReducer from './features/search/searchpageSlice';
import userReducer from './features/user/userSlice';
import libraryReducer from './features/library/librarypageSlice';
import collectionReducer from './features/collection/collectionSlice';
import studentsReducer from './features/students/studentsSlice';
import classRoomReducer from './features/classRoom/classRoomSlice';

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
  collection: collectionReducer,
  students: studentsReducer,
  classRoom: classRoomReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: () => getDefaultMiddleware({
    serializableCheck: false
  })
});
