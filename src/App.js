import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfile from './pages/UserProfile/UserProfile';
import CreateClassroom from './pages/Classroom/CreateClassroom';
import SelectClassroom from './pages/Classroom/SelectClassroom';
import MyClassrooms from './pages/Classroom/MyClassRooms';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import SignUpGoogle from './pages/signUp/SignUpGoogle';
import MyLibrary from './pages/Home/MyLibrary';
import DetailPage from './pages/Subjects/DetailPage';
import SearchSubject from './pages/Subjects/SearchPage';
// import RequireAuth from './components/RequireAuth';

import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/user-profile' element={<UserProfile />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoutes />} />
        {/* non-fixed Routes */}
        <Route path='/' element={<Home />} exact />
        <Route path='/my-classrooms' element={<MyClassrooms />} />
        <Route path='/sign-up-google' element={<SignUpGoogle />} />
        <Route path='/create-classroom' element={<CreateClassroom />} />
        <Route path='/select-classroom' element={<SelectClassroom />} />
        <Route path='/my-library' element={<MyLibrary />} />
        <Route path='/subject/:id' element={<DetailPage />} />
        <Route path='/search-subject' element={<SearchSubject />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
