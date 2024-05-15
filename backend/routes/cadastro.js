import express from 'express'
import { db } from "../db.js";
import bcrypt from 'bcrypt'

const router = express.Router();


// Rota de cadastro de usuário
router.post('/', (req, res) => {
    const { nome, email, password, fone, data_nascimento } = req.body;
  
    const verifica = `SELECT * FROM usuarios WHERE email = '${email}'`; // Verificar se o email cadastrado já existe no sistema
    db.query(verifica, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(400).send('E-mail já cadastrado. Por favor, escolha outro e-mail.');
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          const sql = `INSERT INTO usuarios (nome, email, password, fone, data_nascimento) VALUES ('${nome}', '${email}', '${hash}', '${fone}', '${data_nascimento}')`;
      
          db.query(sql, (err, result) => {
            if (err) throw err;
            res.send('Usuário cadastrado com sucesso!');
          });
        });
      }
    });
  
   
  });

  export default router;