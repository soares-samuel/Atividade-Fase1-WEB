// terceira modificação, adicionando credenciais de email e senha para autenticar o usuário
let mongoose = require("mongoose");

let alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true, min: 15, max: 99 },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  perfil: { type: mongoose.Schema.Types.ObjectId, ref: "Perfil", unique: true, sparse:true }, // Relacionamento 1:1 com perfil, um aluno só pode ter um perfil
  tarefas: { type: mongoose.Schema.Types.ObjectId, ref: "Tarefa" }, // Relacionamento N:N com aluno, vários alunos podem ter muitas tarefas
  turmas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Turma", required: true }], // Relacionamento 1:N com aluno, muitos alunos participam de uma turma
});

module.exports = mongoose.model("Aluno", alunoSchema);