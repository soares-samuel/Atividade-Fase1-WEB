let mongoose = require("mongoose");

let turmaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Aluno"}], // Relacionamento 1:N com aluno, uma turma pode ter muitos alunos
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor", unique:true } // Relacionamento 1:N com professor, várias turmas podem ter um professor
});

module.exports = mongoose.model("Turma", turmaSchema);