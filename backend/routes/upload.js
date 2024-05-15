import express from 'express';
import path from 'path';
import cursosRouter from './routes/cursos.js';
import uploadRouter from './routes/upload.js'; // Importe o router para uploads

const app = express();

// Defina a pasta onde os arquivos serão salvos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Adicione o router para uploads
app.use('/upload', uploadRouter);

// Adicione suas outras rotas
app.use('/cursos', cursosRouter);

export default app;
