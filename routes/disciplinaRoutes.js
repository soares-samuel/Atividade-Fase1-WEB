const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController.js");
const verificarToken = require("../middlewares/auth");

router.use(verificarToken); // Protege todas as rotas abaixo

router.get("/disciplina", disciplinaController.obterTodasDisciplinas);
router.post("/disciplina", disciplinaController.criarDisciplina);
router.delete("/disciplina/:id", disciplinaController.deletarDisciplina);
router.put("/disciplina/:id", disciplinaController.editarDisciplina);

module.exports = router;