// Segundo ajuste é na importação dos models que estão sendo requisitados
const Perfil = require("../models/perfil");
const Aluno = require("../models/aluno");

const criarPerfil = async (req, res) => {
  try {
    const { matricula, telefone, endereco, alunoId } = req.body;
    const novoPerfil = new Perfil({ matricula, telefone, endereco, aluno: alunoId });
    await novoPerfil.save();

    // Atualiza o aluno para conter o ID do novo perfil (Relação 1:1)
    await Aluno.updateOne({ _id: alunoId }, { $set: { perfil: novoPerfil._id } });

    res.status(201).json({ message: "Perfil criado com sucesso!", perfil: novoPerfil });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar perfil", error: error.message });
  }
};

const obterTodosPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.find().populate('aluno');
    res.status(200).json(perfis);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfis", error: error.message });
  }
};

const deletarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Perfil.deleteOne({ _id: id });
    if (resultado.deletedCount === 0) return res.status(404).json({ message: "Perfil não encontrado" });
    res.status(200).json({ message: "Perfil removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar perfil", error: error.message });
  }
};

const editarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { matricula, telefone, endereco, alunoId } = req.body;
    const perfil = await Perfil.findByIdAndUpdate(id, { matricula, telefone, endereco, aluno: alunoId }, { new: true });
    if (!perfil) return res.status(404).json({ message: "Perfil não encontrado" });
    res.status(200).json({ message: "Perfil atualizado com sucesso!", perfil });
  } catch (error) {
    res.status(400).json({ message: "Erro ao editar perfil", error: error.message });
  }
};

module.exports = { criarPerfil, obterTodosPerfis, deletarPerfil, editarPerfil };