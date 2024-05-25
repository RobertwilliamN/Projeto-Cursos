import React from 'react';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './pages/Login.js';
import Cursos from './pages/Cursos.js';
import Error from './pages/Error.js'
import Adicionar from './pages/Adicionar.js';
import Perfil from './pages/Perfil.js';
// import PrivateRoute from './routes/PrivateRoute.js';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/adicionar" element={<Adicionar />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
  );
}

export default App;
