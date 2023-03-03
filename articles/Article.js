// ! Model
const Sequelize = require('sequelize'); // biblioteca p/ trabalhar com Databases
const connection = require("../Database/database"); // load de conexao com banco
const Category = require("./../categories/Category");
// construtor de Artigo
const Article = connection.define('article',{
    title: {
        type: Sequelize.STRING, // Tipo especifico do sequelize
        allowNull: false, // nao aceita null
    },slug: {
        type: Sequelize.STRING, //transforma categorias em strings sem vazios para usar em rotas.
        allowNull: false,
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
})
// * //////////////////////////////////////////////
// * //////////////////////////////////////////////
// * ////  TIPOS DE RELACIONAMENTOS ///////////////
// * //////////////////////////////////////////////
// * //////////////////////////////////////////////
// hasOne() // * "tem um"
// hasMany() // * "tem muitos"
// belongsTo() // * pertence a ( 1-1 ) um para um
// belongsToMany() // * pertence a N
// * //////////////////////////////////////////////
// * //////////////////////////////////////////////
// * ////  TIPOS DE RELACIONAMENTOS ///////////////
// * //////////////////////////////////////////////
// * //////////////////////////////////////////////


Category.hasMany(Article) // * tem MUITOS
Article.belongsTo(Category); // * Um artigo pertence a uma categoria

// Article.sync({force:true})

module.exports = Article;