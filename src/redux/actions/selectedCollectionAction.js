import { SET_COLLECTION, UNSET_COLLECTION, EMPTY_COLLECTION } from '../constants/tokenConstant';

export const selectCollection = (payload) => ({
  type: SET_COLLECTION,
  payload
});

export const unselectCollection = (payload) => ({
  type: UNSET_COLLECTION,
  payload
});

export const emptyCollection = () => ({
  type: EMPTY_COLLECTION,
  payload: true
});
