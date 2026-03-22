const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController.js");
const verificarToken = require("../middleware/auth");

router.use(verificarToken); // Protege todas as rotas abaixo


// Rotas Protegidas
router.get("/", verificarToken, perfilController.obterTodosPerfis);
router.post("/", verificarToken, perfilController.criarPerfil);
router.delete("/:id", verificarToken, perfilController.deletarPerfil);
router.put("/:id", verificarToken, perfilController.editarPerfil);

module.exports = router;