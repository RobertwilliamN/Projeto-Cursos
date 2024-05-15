import React from 'react';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './pages/Login.js';
import Cursos from './pages/Cursos.js';
import User from './pages/User.js'
import Error from './pages/Error.js'
// import PrivateRoute from './routes/PrivateRoute.js';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/User" element={<User />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
  );
}

export default App;
