import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        {/* Protected Routes */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path='/' element={<Home />} />
        {/* </Route> */}
        {/* non-fixed Routes */}
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/my-classrooms' element={<MyClassrooms />} />
        <Route path='/sign-up-google' element={<SignUpGoogle />} />
        <Route path='/create-classroom' element={<CreateClassroom />} />
        <Route path='/select-classroom' element={<SelectClassroom />} />
        <Route path='/my-library' element={<MyLibrary />} />
        <Route path='/subject/:id' element={<DetailPage />} />
        <Route path='/search-subject' element={<SearchSubject />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
