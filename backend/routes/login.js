import express from 'express'
import { db } from "../db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const router = express.Router();

// Rota de Login do usuário
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM usuarios WHERE email = '${email}'`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(password, user.password, (err, match) => {
          if (match) {
            // res.send('Login realizado com sucesso!');
            db.query(`SELECT id FROM usuarios WHERE email = '${email}'`,(err, result) => { // Verificando o ID do usuário 
                if (err) throw err;
                
                if (result.length === 0) {
                  res.status(404).send('Usuário não encontrado');
                } else {
                    const userId = result[0].id;

                    const token = jwt.sign({ userId: user.id }, 'secreto'); // Gerar token JWT
                    const updateTokenSql = `UPDATE usuarios SET token_jwt = '${token}' WHERE id = '${user.id}'`;

                    db.query(updateTokenSql, (err, result) => {
                        if (err) throw err;
                             res.send({token, userId});
                    });
                }
              });
          } else {
            res.status(401).send('Credenciais inválidas. Por favor, tente novamente.');
          }
        });
      } else {
        res.status(401).send('Credenciais inválidas. Por favor, tente novamente.');
      }
    });
  })



export default router;