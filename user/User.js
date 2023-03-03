// ! Model
const Sequelize = require('sequelize'); // biblioteca p/ trabalhar com Databases
const connection = require("../Database/database"); // load de conexao com banco

// construtor de tabela
const User = connection.define('users',{ // MODELS CRIAM TABELAS

    email: {
        type: Sequelize.STRING, //transforma categorias em strings sem vazios para usar em rotas.
        allowNull: false,
    },password: {
        type: Sequelize.STRING, //transforma categorias em strings sem vazios para usar em rotas.
        allowNull: false,
    }
})

// User.sync({force:true})

module.exports = User;