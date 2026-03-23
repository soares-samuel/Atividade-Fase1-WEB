const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");
const verificarToken = require("../middleware/auth");

// Todas as rotas de aluno protegidas
router.use(verificarToken);

router.get("/", alunoController.obterTodosAlunos);
router.post("/", alunoController.criarAluno);
router.delete("/:id", alunoController.deletarAluno);
router.put("/:id", alunoController.editarAluno);

module.exports = router;