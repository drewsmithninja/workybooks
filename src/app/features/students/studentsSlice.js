import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentsAPI from '../../api/studentsAPI';

export const getStudents = createAsyncThunk('students/getStudent', async (classId, thunkAPI) => {
  try {
    const response = await studentsAPI.getStudents(classId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getStudent = createAsyncThunk('students/getStudents', async (studentId, thunkAPI) => {
  try {
    const response = await studentsAPI.getStudent(studentId);
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
        state.isSuccess = false;
        state.message = '';
        state.isError = false;
        state.students = [];
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.students = [];
      })
      .addCase(getStudent.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = '';
        state.isError = false;
        state.students = [];
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.students = [];
      });
  }
});

export default studentsSlice.reducer;
