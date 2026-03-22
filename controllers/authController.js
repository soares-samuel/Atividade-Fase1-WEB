// Quarta modificação: Criando um arquivo para autenticação de login
const Aluno = require("../models/aluno");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o aluno existe
    const aluno = await Aluno.findOne({ email });
    if (!aluno) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Verificando se a senha está correta 
    if (senha !== aluno.senha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gerando o Token JWT 
    const token = jwt.sign(
      { id: aluno._id }, 
      "CHAVE_SECRETA_UNIFACISA", 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

module.exports = { login };