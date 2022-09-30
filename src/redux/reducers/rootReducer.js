import { combineReducers } from 'redux';
import collectionReducer from './collectionReducer';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  collections: collectionReducer
});

export default rootReducer;
