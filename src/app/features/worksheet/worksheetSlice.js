import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import worksheetAPI from '../../api/worksheetAPI';

export const getWorksheets = createAsyncThunk('worksheet/getWorksheets', async (data, thunkAPI) => {
  try {
    const response = await worksheetAPI.getWorksheets(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getPopularWorksheets = createAsyncThunk('library/getPopularWorksheets', async (data, thunkAPI) => {
  try {
    const response = await worksheetAPI.getPopularWorksheets(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getRecentWorksheets = createAsyncThunk('library/getRecentWorksheets', async (thunkAPI) => {
  try {
    const response = await worksheetAPI.getRecentWorksheets();
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  worksheets: null,
  currentWorksheet: null,
  popularWorksheets: null,
  recentWorksheets: null,
  selectedWorksheets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const worksheetSlice = createSlice({
  name: 'worksheet',
  initialState,
  reducers: {
    setCurrentWorksheet(state, action) {
      state.currentWorksheet = action.payload;
    },
    selectWorksheet(state, action) {
      state.selectedWorksheets = [...state.selectedWorksheets, action.payload];
    },
    unSelectWorksheet(state, action) {
      state.selectedWorksheets = state.selectedWorksheets.filter((w) => w !== action.payload);
    },
    resetSelectedWorksheets(state) {
      state.selectedWorksheets = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorksheets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorksheets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.worksheets = action.payload;
      })
      .addCase(getWorksheets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.worksheets = null;
      })
      .addCase(getPopularWorksheets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularWorksheets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.popularWorksheets = action.payload;
      })
      .addCase(getPopularWorksheets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.popularWorksheets = null;
      })
      .addCase(getRecentWorksheets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentWorksheets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recentData = action.payload;
      })
      .addCase(getRecentWorksheets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recentData = null;
      });
  }
});

export const { selectWorksheet, unSelectWorksheet, resetSelectedWorksheets, setCurrentWorksheet } = worksheetSlice.actions;
export default worksheetSlice.reducer;
