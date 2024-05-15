// cursos.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/Curso.css'

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const sliderRef = useRef(null);
  const [usuarioNome, setUsuarioNome] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cursos', {
          headers: {
            Authorization: `Bearer ${token}`,
            UserID: userId
          }
        });
        setCursos(response.data);
        setUsuarioNome(response.data[0].usuario_nome);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId, token]);


  const handleScrollLeft = () => {
    sliderRef.current.scrollLeft -= 400;
  };

  const handleScrollRight = () => {
    sliderRef.current.scrollLeft += 400;
  };

  return (
    <div>
       <div className="header">
      <h1 className='BemVindo'>Olá, bem-vindo {usuarioNome}</h1>
      <div className="navigation-links">
        <a href="/">Novo</a>
        <a href="/">Perfil</a>
      </div>
    </div>
       <div className="tabs">
       <a href="/">Cursos Concluídos</a>
       <a href="/">Cursos em andamento</a>
       <a href="/">Cursos com mais de 10 horas</a>
      </div>
    <div className="slider-container">
      <button className="slider-button left" onClick={handleScrollLeft}>{'<'}</button>
      <div className="slider" ref={sliderRef}>
        {cursos.map((curso) => (
          <div key={curso.id} className="card">
            <h3>{curso.titulo}</h3>
            <h3>Plataforma: {curso.plataforma}</h3>
            <a href='/'>Editar</a>
            <a href='/'>Apagar</a>
            <div className="info">
              <p>Horas: {curso.horas}</p>
              <p>Data Inicial: {curso.data_inicial}</p>
              <p>Data Final: {curso.data_final}</p>
              <p>Data Final: {curso.certificado}</p>
            </div>
            <div className="certificate" style={{ backgroundImage: `url(${'/'+curso.certificado})` }} />
          </div>
        ))}
      </div>
      <button className="slider-button right" onClick={handleScrollRight}>{'>'}</button>
    </div>
    </div>
  );
}

export default Cursos;
