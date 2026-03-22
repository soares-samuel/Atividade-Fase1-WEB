const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController.js");
const verificarToken = require("../middleware/auth");

router.use(verificarToken); // Protege todas as rotas abaixo

// Rotas Protegidas
router.get("/", verificarToken, disciplinaController.obterTodasDisciplinas);
router.post("/", verificarToken, disciplinaController.criarDisciplina);
router.delete("/:id", verificarToken, disciplinaController.deletarDisciplina);
router.put("/:id", verificarToken, disciplinaController.editarDisciplina);

module.exports = router;