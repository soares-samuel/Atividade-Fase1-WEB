const mongoose = require('mongoose');
const Aluno = require('./models/aluno');
const Turma = require('./models/turma');

const server = 'localhost:27017';
const database = 'avaliacao1';

async function seed() {
  try {
    await mongoose.connect(`mongodb://${server}/${database}`);
    console.log('Conectado para semente...');

    // Criando uma Turma inicial 
    let turma = await Turma.findOne({ nome: "Turma Admin" });
    if (!turma) {
      turma = new Turma({ nome: "Turma Admin" });
      await turma.save();
      console.log('Turma Admin criada.');
    }

    // Criar o Aluno Admin
    const adminExistente = await Aluno.findOne({ email: "admin@unifacisa.com" });
    if (!adminExistente) {
      const admin = new Aluno({
        nome: "Administrador",
        idade: 30,
        email: "admin@unifacisa.com",
        senha: "admin123", 
        turmas: [turma._id]
      });

      await admin.save();
      console.log('Usuário Admin criado com sucesso!');
      console.log('Email: admin@unifacisa.com | Senha: admin123');
    } else {
      console.log('Admin já existe no banco.');
    }

    process.exit();
  } catch (err) {
    console.error('Erro no seed:', err);
    process.exit(1);
  }
}

seed();