import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collectionAPI from '../../api/collectionApi';

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

export const updateCollection = createAsyncThunk('collection/updateCollection', async (updateCollectionData, thunkAPI) => {
  try {
    const response = await collectionAPI.updateCollection(updateCollectionData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCollectionLike = createAsyncThunk('collection/updateCollectionLike', async (data, thunkAPI) => {
  try {
    const response = await collectionAPI.updateCollectionLike(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  extraReducers: (builder) => {
    builder
      // new Workybook List cases
      .addCase(createCollection.pending, (state) => {
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
      })
      // update workybook list
      .addCase(updateCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectionInfo = action.payload;
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.collectionInfo = null;
      })
      // update workybook list likes
      .addCase(updateCollectionLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollectionLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectionInfo = action.payload;
      })
      .addCase(updateCollectionLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.collectionInfo = null;
      });
  }
});

export const { reset } = collectionSlice.actions;
export default collectionSlice.reducer;
