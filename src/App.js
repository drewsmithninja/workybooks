import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';
import CreateClassroom from './pages/Classroom/CreateClassroom';
import SelectClassroom from './pages/Classroom/SelectClassroom';
import MyClassrooms from './pages/Classroom/MyClassRooms';
import NewSignIn from './pages/newSignIn/NewSignIn';
import NewSignUp from './pages/newSignUp/NewSignUp';
import NewSignUpGoogle from './pages/newSignUp/NewSignUpGoogle';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import MyLibrary from './pages/Home/MyLibrary';
import DetailPage from './pages/Subjects/DetailPage';
import SubjectDetailsPage from './pages/Subjects/SubjectDetailsPage';
import CCSDetailsPage from './pages/CCS/CCSDetailsPage';
import SearchSubject from './pages/Subjects/SearchPage';
import MyCollection from './pages/Collection/MyCollection';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Worksheet from './pages/worksheet/Worksheet';
import StudentDetailPage from './pages/Student/StudentDetailPage';
import AssignmentDetailsPage from './pages/Classroom/myClassRooms/assignment/AssignmentDetailsPage';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/sign-in' element={<NewSignIn />} />
        <Route path='/sign-up' element={<NewSignUp />} />
        <Route path='/user-profile' element={<UserProfile />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoutes />} />
        {/* non-fixed Routes */}
        <Route path='/' element={<Home />} exact />
        <Route path='/sign-up-google' element={<NewSignUpGoogle />} />
        <Route path='/create-classroom' element={<CreateClassroom />} />
        <Route path='/select-classroom' element={<SelectClassroom />} />
        <Route path='/my-library' element={<MyLibrary />} />
        <Route path='/subject/:id' element={<SubjectDetailsPage />} />
        <Route path='/ccs/:id' element={<CCSDetailsPage />} />
        <Route path='/my-classrooms' element={<MyClassrooms />} />
        <Route path='/my-classrooms/students/:id' element={<StudentDetailPage />} />
        <Route path='/my-classrooms/assignment/:id' element={<AssignmentDetailsPage />} />
        <Route path='/search-subject' element={<SearchSubject />} />
        <Route path='/worksheet/:userId' element={<Worksheet />} />
        <Route path='/collection/:id' element={<MyCollection />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
