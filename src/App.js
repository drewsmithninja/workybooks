import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';
import CreateClassroom from './pages/Classroom/CreateClassroom';
import SelectClassroom from './pages/Classroom/SelectClassroom';
import MyClassrooms from './pages/Classroom/MyClassRooms';
import NewSignIn from './pages/newSignIn/NewSignIn';
import NewSignUp from './pages/newSignUp/NewSignUp';
import NewSignUpGoogle from './pages/newSignUp/NewSignUpGoogle';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/Signin/SignIn';
import SignUp from './pages/signup/Signup';
import SignUpGoogle from './pages/signUp/SignupGoogle';
import MyLibrary from './pages/Home/MyLibrary';
import DetailPage from './pages/Subjects/DetailPage';
import SearchSubject from './pages/Subjects/SearchPage';
import MyCollection from './pages/Collection/MyCollection';

import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Worksheet from './pages/worksheet/Worksheet';

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
        <Route path='/subject/:id' element={<DetailPage />} />
        <Route path='/my-classrooms'>
          <Route index element={<Navigate to='students' replace />} />
          <Route path=':source' element={<MyClassrooms />} replace />
        </Route>
        {/* <Route path='/my-classrooms/students'>
          <Route path=':id' element={<StudentDetailPage />} />
        </Route> */}
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
