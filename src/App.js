import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';
import CreateClassroom from './pages/Classroom/CreateClassroom';
import SelectClassroom from './pages/Classroom/SelectClassroom';
import MyClassrooms from './pages/Classroom/MyClassRooms';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/Signin/SignIn';
import SignUp from './pages/Signup/Signup';
import SignUpGoogle from './pages/Signup/SignupGoogle';
import MyLibrary from './pages/Home/MyLibrary';
import DetailPage from './pages/Subjects/DetailPage';
import SearchSubject from './pages/Subjects/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/my-classrooms' element={<MyClassrooms />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signup-google' element={<SignUpGoogle />} />
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
