import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import libraryAPI from '../../app/api/libraryApi';

const initialState = {
  favoriteList: null,
  myCollectionData: null,
  collectionDetailsList: null,
  recentData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// List Favorite list
// eslint-disable-next-line no-shadow
export const favoriteData = createAsyncThunk('library/favoriteData', async (favoriteData, thunkAPI) => {
  try {
    const response = await libraryAPI.favoriteData(favoriteData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const collectionList = createAsyncThunk('library/collectionList', async (collectionData, thunkAPI) => {
  try {
    const response = await libraryAPI.collectionList(collectionData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Collection Details
export const collectionDetail = createAsyncThunk('library/collectionDetail', async (collectionId, thunkAPI) => {
  try {
    const response = await libraryAPI.collectionDetail(collectionId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get Recent worksheet List
export const recentList = createAsyncThunk('library/recentList', async (recentData, thunkAPI) => {
  try {
    const response = await libraryAPI.recentList(recentData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const librarySlice = createSlice({
  name: 'library',
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
      .addCase(favoriteData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(favoriteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoriteList = action.payload;
      })
      .addCase(favoriteData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.favoriteList = null;
      })
    // Collection List cases
      .addCase(collectionList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(collectionList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myCollectionData = action.payload;
      })
      .addCase(collectionList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.myCollectionData = null;
      })
    // Subject List cases
      .addCase(collectionDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(collectionDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectionDetailsList = action.payload;
      })
      .addCase(collectionDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.collectionDetailsList = null;
      })
    // Recent List Cases
      .addCase(recentList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(recentList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recentData = action.payload;
      })
      .addCase(recentList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recentData = null;
      });
    // // Grade List Cases
    // .addCase(listGrade.pending, (state, action) => {
    //   state.isLoading = true;
    // })
    // .addCase(listGrade.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.gradeData = action.payload;
    // })
    // .addCase(listGrade.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   state.gradeData = null;
    // });
  }
});

export const { reset } = librarySlice.actions;
export default librarySlice.reducer;
