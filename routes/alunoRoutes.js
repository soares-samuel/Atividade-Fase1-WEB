const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");

// Rota Pública
router.post("/aluno", alunoController.criarAluno);

// Rotas Protegidas
router.get("/aluno", verificarToken, alunoController.obterTodosAlunos);
router.delete("/aluno/:id", verificarToken, alunoController.deletarAluno);
router.put("/aluno/:id", verificarToken, alunoController.editarAluno);

module.exports = router;