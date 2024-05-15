import express from 'express'
import { db } from "../db.js";

const router = express.Router();


  // Rota de acesso aos cursos
router.get('/',(req, res) => {
  const userID = req.header('UserID');
  const token = req.header('Authorization').replace('Bearer ', '');
   
    // if (!IDuser || !Token) {
    //    return res.status(401).redirect('/login');
    //   }

    const sql = `SELECT token_jwt FROM usuarios WHERE id = '${userID}'`;

    db.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const dbToken = result[0].token_jwt;

    if (dbToken === token) {
    // Agora, encontrar os cursos associados ao ID do usuário
    db.query(`SELECT cursos.*, usuarios.nome AS usuario_nome, usuarios.email AS usuario_email
    FROM cursos
    INNER JOIN usuarios ON cursos.user_id = usuarios.id
    WHERE cursos.user_id = '${userID}'`, (err, result) => {
        if (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor');
        }

        if (result.length === 0) {
        res.send('Nenhum curso encontrado para este usuário');
        } else {
        res.send(result);
        }
    });
    } else {
    res.status(401).send('Token inválido');
    }
    } else {
      res.status(401).send('Usuário não encontrado');
    }
    });
  });
  

export default router;
  