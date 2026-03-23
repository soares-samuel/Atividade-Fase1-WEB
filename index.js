require('dotenv').config(); 
const express = require('express');
const app = express();
require('./database/db'); 

app.use(express.json()); 


const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const professorRoutes = require('./routes/professorRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const authRoutes = require('./routes/authRoutes');


app.use('/auth', authRoutes);
app.use('/aluno', alunoRoutes);
app.use('/disciplina', disciplinaRoutes);
app.use('/perfil', perfilRoutes);
app.use('/professor', professorRoutes);
app.use('/tarefa', tarefaRoutes);
app.use('/turma', turmaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));