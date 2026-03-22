const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController.js");
const verificarToken = require("../middleware/auth");

router.use(verificarToken); // Protege todas as rotas abaixo

// Rotas Protegidas
router.get("/", verificarToken, professorController.obterTodosProfessores);
router.post("/", verificarToken, professorController.criarProfessor);
router.delete("/:id", verificarToken,professorController.deletarProfessor);
router.put("/:id", verificarToken, professorController.editarProfessor);

module.exports = router;