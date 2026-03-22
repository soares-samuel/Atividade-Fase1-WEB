let mongoose = require("mongoose");

let professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina" }], // Relacionamento N:N com disciplina, um professor pode ter muitas disciplinas
  turmas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Turma", required:true }] // Relacionamento 1:N com turma, um professor pode ter mais de uma turma
});

module.exports = mongoose.model("Professor", professorSchema);