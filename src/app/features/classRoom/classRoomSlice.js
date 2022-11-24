import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import classRoomAPI from '../../api/classRoomApi';

export const getClassRoomOptions = createAsyncThunk('classRoom/getClassRoomOptions', async (thunkAPI) => {
  try {
    const response = await classRoomAPI.getClassRoomOptions();
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const classRoomSlice = createSlice({
  name: 'classRoom',
  initialState: {
    classes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassRoomOptions.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = '';
        state.isError = false;
        state.classes = [];
      })
      .addCase(getClassRoomOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload;
      })
      .addCase(getClassRoomOptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.classes = [];
      });
  }
});

export default classRoomSlice.reducer;
