// primeira alteração no código foi criar o arquivo index.js, para que o servidor se incie 
// e também para conectar as rotas

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
const authRoutes = require('./routes/authRoutes'); // Quinta alteração

app.use(alunoRoutes);
app.use(disciplinaRoutes);
app.use(perfilRoutes);
app.use(professorRoutes);
app.use(tarefaRoutes);
app.use(turmaRoutes);
app.use(authRoutes); // Quinta alteração

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));