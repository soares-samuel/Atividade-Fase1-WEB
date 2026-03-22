// Segundo ajuste é na importação dos models que estão sendo requisitados
const Disciplina = require("../models/disciplina"); 
const Tarefa = require("../models/tarefa"); 

const criarDisciplina = async (req, res) => {
  try {
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    const novaDisciplina = new Disciplina({
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds,
    });

    await novaDisciplina.save();

    // Atualiza as tarefas associadas à disciplina
    await Tarefa.updateMany(
      { _id: { $in: tarefasIds } },
      { $push: { disciplinas: novaDisciplina._id } }
    );

    res.status(201).json({ // 201: Created
      message: "Disciplina criada com sucesso!",
      disciplina: novaDisciplina,
    });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar disciplina", error: error.message });
  }
};

const obterTodasDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find().populate('tarefas');
    res.status(200).json(disciplinas); // 200: OK
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar disciplinas", error: error.message });
  }
};

const deletarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Disciplina.deleteOne({ _id: id });
    
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Disciplina não encontrada" });
    }

    res.status(200).json({ message: "Disciplina removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar disciplina", error: error.message });
  }
};

const editarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    let disciplina = await Disciplina.findByIdAndUpdate(
      id, 
      { nome, descricao, dataInicio, dataFim, tarefas: tarefasIds },
      { new: true }
    );

    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrada" });
    }

    res.status(200).json({
      message: "Disciplina atualizada com sucesso!",
      disciplina,
    });
  } catch (error) {
    res.status(400).json({ message: "Erro ao editar disciplina", error: error.message });
  }
};

module.exports = { 
  criarDisciplina, 
  obterTodasDisciplinas, 
  deletarDisciplina, 
  editarDisciplina 
};