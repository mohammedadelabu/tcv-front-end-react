import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from '../src/pages/Register/Register'
import Login from  '../src/pages/Login/Login'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </Router>
  );
}

export default App;
