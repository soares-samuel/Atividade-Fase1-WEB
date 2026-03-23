const Aluno = require("../models/aluno"); 
const Perfil = require("../models/perfil"); 

const criarAluno = async (req, res) => {
  try {
    const { nome, idade, email, senha, turmas } = req.body;
    const novoAluno = new Aluno({ nome, idade, email, senha, turmas });
    await novoAluno.save();

    res.status(201).json({ message: "Aluno criado com sucesso!", aluno: novoAluno });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar aluno", error: error.message });
  }
};

const obterTodosAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('perfil').populate('turmas');
    res.status(200).json({ alunos, message: "Alunos encontrados com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alunos", error: error.message });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Aluno.findByIdAndDelete(id);
    if (!resultado) return res.status(404).json({ message: "Aluno não encontrado" });

    res.status(200).json({ message: 'Aluno removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar aluno", error: error.message });
  }
};

module.exports = { criarAluno, obterTodosAlunos, deletarAluno };