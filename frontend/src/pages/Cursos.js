// cursos.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/Curso.css'


function Cursos() {
  const [cursos, setCursos] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [filteredCursos, setFilteredCursos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const sliderRef = useRef(null);
  const [usuarioNome, setUsuarioNome] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cursos', {
          headers: {
            Authorization: `Bearer ${token}`,
            UserID: userId
          }
        });
        setCursos(response.data);
        setUsuarioNome(response.data[0].usuario_nome);
        setFilteredCursos(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId, token]);

  useEffect(() => {
    if (filtro === 'Todos') {
      setFilteredCursos(cursos);
    } else {
      setFilteredCursos(cursos.filter(curso => curso.status === filtro));
    }
  }, [filtro, cursos]);

  const handleFilterClick = (filtro) => {
    setFiltro(filtro);
  };


  const handleScrollLeft = () => {
    sliderRef.current.scrollLeft -= 200;
  };

  const handleScrollRight = () => {
    sliderRef.current.scrollLeft += 200;
  };


  return (
    <div className="video-container">
      <video autoPlay muted loop className="background-video">
            <source src="background.mp4" type="video/mp4" />
      </video>
        <div className="content">
             
      <div className="header">
        <h1 className='BemVindo'>Olá, {usuarioNome}</h1>
        <div className='navbar-button'>
          <a href="/adicionar" className='Button-adicionar'>Adicionar Novo</a>
          <a href="/perfil" className='Button-perfil'>Perfil</a>
          <a href="/" className='Button-logout'>Logout</a>
        </div>
    </div>

    <div className="filtro">
        <div className='filtro-menu'>
            <button onClick={() => handleFilterClick('Todos')} className='Button-filtro'>Todos</button>
            <button onClick={() => handleFilterClick('Pausado')} className='Button-filtro'>Pausados</button>
            <button onClick={() => handleFilterClick('Andamento')} className='Button-filtro'>Andamento</button>
            <button onClick={() => handleFilterClick('Concluido')} className='Button-filtro'>Concluídos</button>
        </div>
    </div>

    <div className="slider-container">
          <button className="slider-button left" onClick={handleScrollLeft}>{'<'}</button>
          <div className="slider" ref={sliderRef}>
            {filteredCursos.map((curso) => (
              <a href='/' key={curso.id}>
                <div className="card">
                  <header className='card-header'>{curso.data_inicial && new Date(curso.data_inicial).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</header>
                  <h1>{curso.titulo}</h1>
                  <h2>{curso.plataforma}</h2>
                  <h3>{curso.status}</h3>
                  <div className="info">
                    {curso.conteudo.split(',').map((item, index) => (
                      <a key={index} href='/cursos'>{item.trim()}</a>
                    ))}
                  </div>
                  <div className='editar-apagar'>
                    <a href={curso.url} className='acessar'>Acessar</a>
                    <a href='/' className='editar'>Editar</a>
                    <a href='/' className='apagar'>Deletar</a>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <button className="slider-button right" onClick={handleScrollRight}>{'>'}</button>
        </div>
  </div>
    </div>
  );
}

export default Cursos;
