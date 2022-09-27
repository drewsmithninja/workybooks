import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateClassroom from './pages/Classroom/CreateClassroom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/Signin/SignIn';
import SignUp from './pages/Signup/Signup';
import SignUpGoogle from './pages/Signup/SignupGoogle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signup-google' element={<SignUpGoogle />} />
        <Route path='/create-classroom' element={<CreateClassroom />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
