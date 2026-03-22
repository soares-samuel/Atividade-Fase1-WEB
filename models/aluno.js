// terceira modificação, adicionando credenciais de email e senha para autenticar o usuário
let mongoose = require("mongoose");

let alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true, min: 15, max: 99 },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  perfil: { type: mongoose.Schema.Types.ObjectId, ref: "Perfil" },
});

module.exports = mongoose.model("Aluno", alunoSchema);