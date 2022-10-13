import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const rootReducer = combineReducers({
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true
});

// import { composeWithDevTools } from '@redux-devtools/extension';
// import { applyMiddleware, createStore } from 'redux';
// import rootReducer from './reducers/rootReducer';

// const thunk = require('redux-thunk').default;

// export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// export const persistor = persistStore(store);
