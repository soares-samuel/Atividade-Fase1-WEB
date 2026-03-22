const express = require("express");
const router = express.Router();
const tarefaController = require("../controllers/tarefaController.js");
const verificarToken = require("../middleware/auth");

router.use(verificarToken); // Protege todas as rotas abaixo

// Rotas Protegidas
router.get("/", verificarToken, tarefaController.obterTodasTarefas);
router.post("/", verificarToken, tarefaController.criarTarefa);
router.delete("/:id", verificarToken, tarefaController.deletarTarefa);
router.put("/:id", verificarToken, tarefaController.editarTarefa);

module.exports = router;
