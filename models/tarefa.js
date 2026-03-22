let mongoose = require("mongoose");
const Aluno = require("../models/aluno.js");

let tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: Boolean,
  aluno: {type: mongoose.Schema.Types.ObjectId, ref: "Aluno"}, // Relacionamento N:N com aluno, várias tarefas pertencem a vários alunos
  disciplina: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina", required: true}] // Relacionamento 1:N com disciplina, muitas tarefas pertencem a uma disciplina
});

module.exports = mongoose.model("Tarefa", tarefaSchema);