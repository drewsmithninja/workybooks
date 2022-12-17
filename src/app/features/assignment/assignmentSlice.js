import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import assignmentAPI from '../../api/assignmentAPI';

export const getAssignments = createAsyncThunk('assignment/getAssignments', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getAssignments(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignments: [],
    currentAssignment: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null
  },
  reducers: {
    setAssignment(state, action) {
      state.currentAssignment = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssignments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignments = action.payload;
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { setAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;
