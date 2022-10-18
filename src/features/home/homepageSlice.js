import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import homeAPI from '../../app/api/homeApi';

const initialState = {
  worksheetData: null,
  subjectData: null,
  cclData: null,
  gradeData: null,
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
export const listCCL = createAsyncThunk('home/commonCoreStandard', async (cclData, thunkAPI) => {
  try {
    const response = await homeAPI.listCCL(cclData);
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
        state.cclData = action.payload;
      })
      .addCase(listCCL.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cclData = null;
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
      });
  }
});

export const { reset } = homeSlice.actions;
export default homeSlice.reducer;