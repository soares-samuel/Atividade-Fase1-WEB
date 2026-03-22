let mongoose = require("mongoose");


let disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  dataInicio: { type: Date, default: Date.now() },
  dataFim: { type: Date },
  tarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarefa" }], // Relacionamento 1:N com tarefa, uma disciplina possui muitas tarefas
  professores: [{type: mongoose.Schema.Types.ObjectId, ref: "Professor"}] // Relacionamento N:N com professor, vários professores podem lecionar várias disciplinas 
});

module.exports = mongoose.model("Disciplina", disciplinaSchema);