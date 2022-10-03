import { SET_COLLECTION, UNSET_COLLECTION, EMPTY_COLLECTION } from '../constants/tokenConstant';

const initialState = {
  selectedCollections: []
};

// eslint-disable-next-line default-param-last
const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    // token create network
    case SET_COLLECTION:
      return {
        ...state,
        selectedCollections: [...new Set([...state.selectedCollections, action.payload])]
      };
    case UNSET_COLLECTION:
      return {
        ...state,
        selectedCollections: state.selectedCollections.filter((x) => x.id !== action.payload.id)
      };
    case EMPTY_COLLECTION:
      return {
        ...state,
        selectedCollections: []
      };
    default:
      return state;
  }
};

export default collectionReducer;
