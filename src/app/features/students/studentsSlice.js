import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentsAPI from '../../api/studentsAPI';

export const createStudents = createAsyncThunk('students/createStudents', async (classId, thunkAPI) => {
  try {
    const response = await studentsAPI.createStudents(classId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getStudents = createAsyncThunk('students/getStudents', async (classId, thunkAPI) => {
  try {
    const response = await studentsAPI.getStudents(classId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getStudent = createAsyncThunk('students/getStudent', async (studentId, thunkAPI) => {
  try {
    const response = await studentsAPI.getStudent(studentId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editStudent = createAsyncThunk('students/editStudent', async (data, thunkAPI) => {
  try {
    const response = await studentsAPI.getStudent(data);
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
    newStudents: [],
    editStudent: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  reducers: {
    resetNewStudents(state) {
      state.newStudents = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newStudents = action.payload;
      })
      .addCase(createStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
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
      })
      .addCase(getStudent.pending, (state) => {
        state.isLoading = true;
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
      })
      .addCase(editStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editStudent = action.payload;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { resetNewStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
