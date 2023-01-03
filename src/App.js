import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';
import CreateClassroom from './pages/Classroom/CreateClassroom';
import SelectClassroom from './pages/Classroom/SelectClassroom';
import MyClassrooms from './pages/Classroom/MyClassRooms';
import NewSignIn from './pages/newSignIn/NewSignIn';
import NewSignUp from './pages/newSignUp/NewSignUp';
import ForgotPassword from './pages/newSignIn/ForgotPassword';
import ResetPassword from './pages/newSignIn/ResetPassword';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import NewSignUpGoogle from './pages/newSignUp/NewSignUpGoogle';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import MyLibrary from './pages/Home/MyLibrary';
import SubjectDetailsPage from './pages/Subjects/SubjectDetailsPage';
import CCSDetailsPage from './pages/CCS/CCSDetailsPage';
import SearchResult from './pages/Search/SearchPage';
import MyCollection from './pages/Collection/MyCollection';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Worksheet from './pages/worksheet/Worksheet';
import StudentDashboard from './pages/Student/StudentDashboard';
import AssignmentDetailsPage from './pages/Classroom/myClassRooms/assignment/AssignmentDetailsPage';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<NewSignUp />} />
        <Route path="/sign-in" element={<NewSignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/verify-email/:id" element={<VerifyEmail />} />
        <Route path="/sign-up-google" element={<NewSignUpGoogle />} />
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/grade-selection" element={<CreateClassroom />} />
          <Route path="/select-classroom" element={<SelectClassroom />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/subject/:sid" element={<SubjectDetailsPage />} />
          <Route path="/ccs/:id" element={<CCSDetailsPage />} />
          <Route path="/my-classrooms" element={<MyClassrooms />} />
          <Route path="/my-classrooms/student-dashboard/:id" element={<StudentDashboard />} />
          <Route path="/my-classrooms/assignment/:id" element={<AssignmentDetailsPage />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/worksheet/:userId" element={<Worksheet />} />
          <Route path="/collection/:id" element={<MyCollection />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
