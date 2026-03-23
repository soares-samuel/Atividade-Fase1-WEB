// Segundo ajuste é na importação dos models que estão sendo requisitados
const Turma = require("../models/turma");
const Aluno = require("../models/aluno");
const Professor = require("../models/professor");

const criarTurma = async (req, res) => {
  try {
    const { nome, alunosIds, professorId } = req.body;
    const novaTurma = new Turma({ nome, alunos: alunosIds, professor: professorId });
    await novaTurma.save();
    res.status(201).json({ message: "Turma criada com sucesso!", turma: novaTurma });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar turma", error: error.message });
  }
};

const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate('alunos').populate('professor');
    res.status(200).json(turmas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar turmas", error: error.message });
  }
};

const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Turma.findByIdAndDelete(id);
    if (resultado.deletedCount === 0) return res.status(404).json({ message: "Turma não encontrada" });
    res.status(200).json({ message: "Turma removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar turma", error: error.message });
  }
};

const editarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, alunosIds, professorId } = req.body;
    const turma = await Turma.findByIdAndUpdate(id, { nome, alunos: alunosIds, professor: professorId }, { new: true });
    if (!turma) return res.status(404).json({ message: "Turma não encontrada" });
    res.status(200).json({ message: "Turma atualizada com sucesso!", turma });
  } catch (error) {
    res.status(400).json({ message: "Erro ao editar turma", error: error.message });
  }
};

module.exports = { criarTurma, obterTodasTurmas, deletarTurma, editarTurma };