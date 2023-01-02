import moment from 'moment';
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

export const getSubmittedAssignments = createAsyncThunk('assignment/getSubmittedAssignments', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getSubmittedAssignments(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAssignmentsByStatus = createAsyncThunk('assignment/getAssignmentsByStatus', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getAssignmentsByStatus(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAssignmentsByStudent = createAsyncThunk('assignment/getAssignmentsByStudent', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getAssignmentsByStudent(data);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});
export const getStudentAssignmentDetail = createAsyncThunk('assignment/getStudentAssignmentDetail', async (data, thunkAPI) => {
  try {
    const response = await assignmentAPI.getStudentAssignmentDetail(data);
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
    assignmentsByStatus: [],
    assignmentsByStudents: [],
    studentAssignmentDetail: [],
    studentAssignmentReportJson: [],
    submittedAssignments: [],
    status: '',
    currentAssignment: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null
  },
  reducers: {
    setAssignment(state, action) {
      state.currentAssignment = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
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
        state.assignments = action.payload.list;
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubmittedAssignments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmittedAssignments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submittedAssignments = action.payload;
      })
      .addCase(getSubmittedAssignments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAssignmentsByStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignmentsByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignments = action.payload.assignment;
      })
      .addCase(getAssignmentsByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAssignmentsByStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignmentsByStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignmentsByStudents = action.payload;
      })
      .addCase(getAssignmentsByStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudentAssignmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentAssignmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studentAssignmentDetail = action.payload;

        // eslint-disable-next-line no-unsafe-optional-chaining
        const { assignmentScore } = action?.payload?.studentsAssignmentData?.[0];
        let newJsonData = [];
        assignmentScore.forEach((data) => {
          const newObject = {
            studentName: data?.student_name,
            submittedDate: moment(data?.submittedDate?.[0]).format('DD/MM/YYYY hh:mm a') || 'N/A',
            time: moment(data?.time?.[0]).format('hh:mm') || 'N/A',
            totalCorrectAnswer: data?.totalCorrectAnswer,
            totalWrongAnswer: data?.totalWrongAnswer,
            totalBlankAnswer: data?.totalBlankAnswer,
            averagePercentage: data?.averagePercentage,
            assignmentGrade: 'F',
            assignmentGradeColor: 'red'
          };
          newJsonData = [...newJsonData, newObject];
        });
        state.studentAssignmentReportJson = newJsonData;
      })
      .addCase(getStudentAssignmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { setAssignment, setStatus } = assignmentSlice.actions;
export default assignmentSlice.reducer;
