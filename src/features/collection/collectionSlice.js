import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import collectionAPI from '../../app/api/collectionApi';

const initialState = {
  collectionInfo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// List new worksheet
// eslint-disable-next-line no-shadow
export const createCollection = createAsyncThunk('collection/createCollection', async (collectionData, thunkAPI) => {
  try {
    const response = await collectionAPI.createCollection(collectionData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // new Workybook List cases
      .addCase(createCollection.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectionInfo = action.payload;
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.collectionInfo = null;
      });
  }
});

export const { reset } = collectionSlice.actions;
export default collectionSlice.reducer;
