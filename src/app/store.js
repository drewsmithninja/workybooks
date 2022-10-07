import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import authService from '../features/auth/authApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
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
