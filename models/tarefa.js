let mongoose = require("mongoose");
const Aluno = require("../models/aluno.js");

let tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: {type: Boolean, default: false},
  aluno: {type: mongoose.Schema.Types.ObjectId, ref: "Aluno"}, // Relacionamento N:N com aluno, várias tarefas pertencem a vários alunos
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina"}] // Relacionamento N:N com disciplina, muitas tarefas pertencem a muitas disciplina
});

module.exports = mongoose.model("Tarefa", tarefaSchema);