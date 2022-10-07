import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

// import { composeWithDevTools } from '@redux-devtools/extension';
// import { persistReducer, persistStore } from 'redux-persist';
// import { applyMiddleware, createStore } from 'redux';
// import storage from 'redux-persist/lib/storage';
// import rootReducer from './reducers/rootReducer';

// const persistConfig = {
//   key: 'root',
//   storage
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const thunk = require('redux-thunk').default;

// export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// export const persistor = persistStore(store);
