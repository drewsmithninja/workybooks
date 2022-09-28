import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
