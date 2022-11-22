import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentsAPI from '../../api/studentsAPI';

export const getStudents = createAsyncThunk('students/getStudents', async (thunkAPI) => {
  try {
    const response = await studentsAPI.getStudents();
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectionInfo = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.collectionInfo = [];
      });
  }
});

export default studentsSlice.reducer;
