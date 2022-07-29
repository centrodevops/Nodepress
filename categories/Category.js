// ! Model
const Sequelize = require('sequelize'); // biblioteca p/ trabalhar com Databases
const connection = require("../Database/database"); // load de conexao com banco

// construtor de tabela
const Category = connection.define('category',{ // MODELS CRIAM TABELAS
    title: {
        type: Sequelize.STRING, // Tipo especifico do sequelize
        allowNull: false, // nao aceita null
    },slug: {
        type: Sequelize.STRING, //transforma categorias em strings sem vazios para usar em rotas.
        allowNull: false,
    }
})

// Category.sync({force:true})

module.exports = Category;