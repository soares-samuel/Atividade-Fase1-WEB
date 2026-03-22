let mongoose = require("mongoose");

let perfilSchema = new mongoose.Schema({
  matricula: {type: String, require: true, nullable: false, unique: true},
  telefone: {type: String, require: true},
  endereco: {type: String, require: true, nullable: false},
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno" , unique: true}  // Relacionamento 1:1 com aluno, um perfil só possui um aluno vinculado
  
});

module.exports = mongoose.model("Perfil", perfilSchema);