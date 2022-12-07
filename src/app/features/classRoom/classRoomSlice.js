import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import classroomAPI from '../../api/classroomApi';

export const createClass = createAsyncThunk('classroom/createClass', async (classData, thunkAPI) => {
  try {
    const response = await classroomAPI.createClass(classData);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const editClass = createAsyncThunk('classroom/editClass', async (data, thunkAPI) => {
  try {
    const response = await classroomAPI.editClass(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const getClassRoomOptions = createAsyncThunk('classroom/getClassRoomOptions', async (thunkAPI) => {
//   try {
//     const response = await classroomAPI.getClassRoomOptions();
//     return response;
//   } catch (error) {
//     const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const getClassrooms = createAsyncThunk('classroom/getClassrooms', async (thunkAPI) => {
  try {
    const response = await classroomAPI.getClassrooms();
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const classroomSlice = createSlice({
  name: 'classroom',
  initialState: {
    classes: [],
    currentClass: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null
  },
  reducers: {
    setClass(state, action) {
      state.currentClass = action.payload;
      state.isError = false;
      state.isSuccess = true;
    },
    reset(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentClass = action.payload;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentClass = action.payload;
      })
      .addCase(editClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClassrooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassrooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload;
      })
      .addCase(getClassrooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, setClass } = classroomSlice.actions;
export default classroomSlice.reducer;
