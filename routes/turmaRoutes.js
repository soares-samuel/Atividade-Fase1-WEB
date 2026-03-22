const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController.js");
const verificarToken = require("../middleware/auth");

router.use(verificarToken); // Protege todas as rotas abaixo

// Rotas Protegidas
router.get("/", verificarToken, turmaController.obterTodasTurmas);
router.post("/", verificarToken, turmaController.criarTurma);
router.delete("/:id", verificarToken, turmaController.deletarTurma);
router.put("/:id", verificarToken, turmaController.editarTurma);

module.exports = router;