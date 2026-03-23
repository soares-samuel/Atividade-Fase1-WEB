// Segundo ajuste é na importação dos models que estão sendo requisitados
const Tarefa = require("../models/tarefa");
const Disciplina = require("../models/disciplina");

const criarTarefa = async (req, res) => {
  try {
    const { titulo, alunoId, disciplinasIds } = req.body;
    const novaTarefa = new Tarefa({ titulo, aluno: alunoId, disciplinas: disciplinasIds });
    await novaTarefa.save();
    res.status(201).json({ message: "Tarefa criada com sucesso!", tarefa: novaTarefa });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar tarefa", error: error.message });
  }
};

const obterTodasTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find().populate("aluno").populate("disciplinas");
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error: error.message });
  }
};

const deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Tarefa.deleteOne(id);
    if (resultado.deletedCount === 0) return res.status(404).json({ message: "Tarefa não encontrada" });
    res.status(200).json({ message: "Tarefa removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar tarefa", error: error.message });
  }
};

const editarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, concluida } = req.body;
    const tarefa = await Tarefa.findByIdAndUpdate(id, { titulo, concluida }, { new: true });
    if (!tarefa) return res.status(404).json({ message: "Tarefa não encontrada" });
    res.status(200).json({ message: "Tarefa atualizada com sucesso!", tarefa });
  } catch (error) {
    res.status(400).json({ message: "Erro ao editar tarefa", error: error.message });
  }
};

module.exports = { criarTarefa, obterTodasTarefas, deletarTarefa, editarTarefa };