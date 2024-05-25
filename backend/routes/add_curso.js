// create_curso.js
import express from 'express';
import { db } from "../db.js";
import multer from 'multer';
import path from 'path'

const router = express.Router();

// Configuração do multer para salvar o arquivo na pasta uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.resolve('uploads/'));
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('certificado');

// Rota para criar um novo curso
router.post('/', upload, (req, res) => {
     const { titulo, conteudo, plataforma, opniao, userId, status, url, data_inicial, data_final, horas } = req.body;

     console.log(titulo,conteudo,plataforma,opniao,userId )


    if (!titulo || !userId || !opniao || !plataforma || !conteudo) {
        return res.status(400).send('Este campo é obrigatório');
     }

     // Verificando se o arquivo foi enviado
     //if (!req.file) {
      //return res.status(400).send('O arquivo do certificado é obrigatório');
    //}
    const certificado =  req.file.filename;


    // Salvando os dados do curso no banco de dados
     const sql = `INSERT INTO cursos (titulo, conteudo, plataforma, opniao, user_id, certificado, status, url, data_inicial, data_final, horas ) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?)`;
     db.query(sql, [titulo, conteudo, plataforma, opniao, userId, certificado,status, url, data_inicial, data_final, horas], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao salvar o curso no banco de dados');
        }
        res.send('Curso criado com sucesso!');
    });
});

export default router;
