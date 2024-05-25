import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'



function Perfil() {
  const [email_user, setEmail] = useState('');
  const [password_user, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', { email: email_user, password: password_user });
      const token = response.data.token;
      const userId = response.data.userId;

    
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
        
      navigate('/cursos'); // Enviando para o /Cursos para visualizar os cursos pertercentes ao usuários
      
    } catch (error) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
      console.log(error);
    }
  };

  return (
    <div className="video-container">
      <video autoPlay muted loop className="background-video">
            <source src="background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
      </video>
        <div className="content">
    
       <div className='Login'>
      <form onSubmit={handleSubmit}>
        <div className='FormInput'>
          <h1>Login</h1>
          <p>Preencha os campos abaixo com seus dados de acesso.</p>
          <input placeholder='Digite seu e-mail'
            type="email"
            value={email_user}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
            <i class='bx bxs-user-pin' ></i>
        </div>
        <div className='FormInput'>
         
          <input
            placeholder='Digite sua senha'
            type="password"
            value={password_user}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <i class='bx bxs-lock-alt'></i>
        </div>
        <button type="submit">Acessar</button>
        <a href='/Cursos'>Criar minha conta</a>
        <a href='/Cursos'>Esqueci minha senha </a>
        {error && <p className='error'>{error}</p>}
      </form>
      
    </div>
    </div>
    </div>
    
  );
}

export default Perfil;
