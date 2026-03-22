const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");
const verificarToken = require("../middleware/auth");


// Rotas Protegidas
router.post("/", verificarToken, alunoController.criarAluno);
router.get("/", verificarToken, alunoController.obterTodosAlunos);
router.delete("/:id", verificarToken, alunoController.deletarAluno);
router.put("/:id", verificarToken, alunoController.editarAluno);

module.exports = router;