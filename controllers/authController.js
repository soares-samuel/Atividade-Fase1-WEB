const Aluno = require("../models/aluno");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const aluno = await Aluno.findOne({ email });
    if (!aluno || senha !== aluno.senha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: aluno._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

module.exports = { login };