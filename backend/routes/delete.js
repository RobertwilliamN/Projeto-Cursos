// routes/delete.js
import express from 'express';
import { db } from "../db.js";

const router = express.Router();

router.delete('/:idCurso', (req, res) => { // /cursos/delete/id
    const idCurso = req.params.idCurso; // Parametro ID para remover Curso específico
    const { Token, IDuser } = req.body; // Token e IDuser para validar a autenticação do usuário 

    //console.log(idCurso);
    //console.log(Token);
    //console.log(IDuser);

    if (!idCurso || !Token || !IDuser) {
        return res.status(401).send('Parâmetros inválidos');
    }

    const sql = `SELECT token_jwt FROM usuarios WHERE id = '${IDuser}'`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erro interno do servidor');
        }

        if (result.length > 0) {
            const dbToken = result[0].token_jwt;

            if (dbToken === Token) {
                // Agora, encontrar os cursos associados ao ID do usuário
                db.query(`DELETE FROM cursos WHERE id = '${idCurso}' AND user_id = '${IDuser}'`, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Erro interno do servidor');
                    }
                    if (result.affectedRows === 0) {
                        res.send('Nenhum curso Encontrado ou Inexistente para este usuário');
                    } else {
                        res.send("Curso deletado com sucesso!");
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
