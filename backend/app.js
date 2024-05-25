import express  from "express"
import cors from "cors"
import loginRouter from './routes/login.js'
import cadastroRouter from './routes/cadastro.js'
import cursosRouter from './routes/cursos.js'
import DeleteCursoRouter from './routes/delete.js'
import UpdateRouter from './routes/update_cursos.js'
import CreateRouter from './routes/add_curso.js'

const port = 8000;
const app = express();
app.use(express.json());
app.use(cors());


app.use('/', loginRouter); // Metodo post para verificar email e senha do usuário no banco // OK Rota de login 

app.use('/cadastro', cadastroRouter); // Metodo post para criar um novo usuário no banco // OK Rota de cadastro user

app.use('/cursos', cursosRouter); // Metodo Get para requisição de todos curso referente ao usuário no banco // OK Rota de acesso aos cursos após autenticação

app.use('/cursos/delete', DeleteCursoRouter); // Delete para deletar um curso // OK Rota para deletar curso específico

app.use('/cursos/novoCurso', CreateRouter); // Metodo Post para inserir um novo curso // OK Rota para criar um novo curso

app.use('/cursos/editar', UpdateRouter); // Metodo Get para requisição de curso específico/id // OK Rota para atualizar um curso específico


// app.put('/user/atualizar', ); // PUT novamente para atualizar o usuário



// Escutando porta declarada
app.listen(port, ()=> {
  console.log('Server started on port ', port);
});