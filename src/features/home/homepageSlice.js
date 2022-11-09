import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import homeAPI from '../../app/api/homeApi';

const initialState = {
  worksheetData: null,
  worksheetDetailsInfo: null,
  subjectData: null,
  ccsData: null,
  gradeData: null,
  likeResponse: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// List new worksheet
// eslint-disable-next-line no-shadow
export const newWorksheet = createAsyncThunk('home/newWorksheet', async (worksheetData, thunkAPI) => {
  try {
    const response = await homeAPI.newWorksheet(worksheetData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const worksheetDetails = createAsyncThunk('home/worksheetDetails', async (worksheetId, thunkAPI) => {
  try {
    const response = await homeAPI.worksheetDetails(worksheetId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// List Subject
export const listSubject = createAsyncThunk('home/subject', async (subjectData, thunkAPI) => {
  try {
    const response = await homeAPI.listSubject(subjectData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// List Subject
export const listCCL = createAsyncThunk('home/commonCoreStandard', async (ccsData, thunkAPI) => {
  try {
    const response = await homeAPI.listCCL(ccsData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// List Grade
export const listGrade = createAsyncThunk('home/grade/list', async (gradeData, thunkAPI) => {
  try {
    const response = await homeAPI.listGrade(gradeData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Like Worksheet
export const likeWorksheet = createAsyncThunk('home/likeWorksheet', async (worksheetData, thunkAPI) => {
  try {
    const response = await homeAPI.likeWorksheet(worksheetData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const homeSlice = createSlice({
  name: 'home',
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
      .addCase(newWorksheet.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(newWorksheet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.worksheetData = action.payload;
      })
      .addCase(newWorksheet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.worksheetData = null;
      })
      // Workysheet Details cases
      .addCase(worksheetDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(worksheetDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.worksheetDetailsInfo = action.payload;
      })
      .addCase(worksheetDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.worksheetDetailsInfo = null;
      })
      // Subject List cases
      .addCase(listSubject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(listSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subjectData = action.payload;
      })
      .addCase(listSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.subjectData = null;
      })
      // CCL List Cases
      .addCase(listCCL.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(listCCL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ccsData = action.payload;
      })
      .addCase(listCCL.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.ccsData = null;
      })
      // Grade List Cases
      .addCase(listGrade.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(listGrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gradeData = action.payload;
      })
      .addCase(listGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.gradeData = null;
      })
      // Like worksheet Cases
      .addCase(likeWorksheet.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likeWorksheet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.likeResponse = action.payload;
      })
      .addCase(likeWorksheet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.likeResponse = null;
      });
  }
});

export const { reset } = homeSlice.actions;
export default homeSlice.reducer;
