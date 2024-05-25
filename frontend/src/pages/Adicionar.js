import React, { useState } from 'react';
import axios from 'axios';
import '../style/Adicionar.css';

function Adicionar() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [opniao, setOpniao] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [horas, setHoras] = useState('');
  const [status, setStatus] = useState('Concluido');
  const [url, setUrl] = useState('');
  const [certificado, setCertificado] = useState(null);
  

  const userId = localStorage.getItem('userId');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('plataforma', plataforma);
    formData.append('opniao', opniao);
    formData.append('userId', userId);
    formData.append('status', status);
    formData.append('url', url);
    formData.append('data_inicial', dataInicial);
    formData.append('data_final', dataFinal);
    formData.append('horas', horas);
    formData.append('certificado', certificado);

    try {
      await axios.post('http://localhost:8000/cursos/novoCurso', formData, {
        headers: {
          Authorization: `Bearer ${userId}`
         
        },
      });
      alert('Curso adicionado com sucesso!');
      // Redirecionar ou limpar o formulário após o envio bem-sucedido, se necessário
    } catch (error) {
      console.error('Erro ao adicionar curso:', error);
      alert('Erro ao adicionar curso.');
    }
  };

  return (

    <div className="video-container">
    <video autoPlay muted loop className="background-video">
          <source src="background.mp4" type="video/mp4" />
    </video>
      <div className="content">
        <div className="header">
            <div className='navbar-button'>
            <a href="/cursos" className='Button-home'>Home</a>
            </div>
        </div>
        <div className="adicionar-container">
        <form onSubmit={handleSubmit} className="adicionar-form" encType="multipart/form-data">
            <h1>Adicionar Novo Curso</h1>
            <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
                placeholder='Digite um título'
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="conteudo">Conteúdo (separado por vírgula):</label>
            <input
                placeholder='Banco de dados, NodeJS, RectJS'
                type="text"
                id="conteudo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="plataforma">Plataforma:</label>
            <input
                placeholder='Digite a plataforma de ensino: Alura, DIO'
                type="text"
                id="plataforma"
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label  htmlFor="opniao">Opinião:</label>
            <textarea
                placeholder='Digite sua opnião sobre o curso ou sugestão'
                id="opniao"
                value={opniao}
                onChange={(e) => setOpniao(e.target.value)}
                required
                rows="5"
                cols="60"
            ></textarea>
            </div>
            <div className="form-group">
            <label  htmlFor="status">Status:</label>
            <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <option value="Concluido">Concluído</option>
                <option value="Pausado">Pausado</option>
                <option value="Andamento">Andamento</option>
                </select>
            </div>
            <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
                placeholder='Cole aqui a URL do curso'
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="dataInicial">Data Inicial:</label>
            <input
                type="date"
                id="dataInicial"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="dataFinal">Data Final:</label>
            <input
                type="date"
                id="dataFinal"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="horas">Horas:</label>
            <input
                placeholder='Digite a hora total do curso'
                type="number"
                id="horas"
                value={horas}
                onChange={(e) => setHoras(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="certificado">Certificado (PDF):</label>
            <input
                type="file"
                id="certificado"
                accept="application/pdf"
                onChange={(e) => setCertificado(e.target.files[0])}
                required
            />
            </div>
            <button type="submit" className="submit-button">Adicionar Curso</button>
        </form>
        </div>
        </div>
    </div>
  );
}

export default Adicionar;
