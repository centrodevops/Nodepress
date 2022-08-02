// Servidor
const express = require("express");
const bodyParser = require('body-parser');
const connection = require('./Database/database'); // importando arquivo que indica banco


const app = express(); //Instanciou o express
const session = require('express-session'); // importando o express-session cookies e sessoes

// Controllers importados do express
const  articleController = require("./articles/articlesController");
const  categoriesController = require("./categories/categoriesController");
const usersController = require("./user/usersController.js");

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// Esses cookies são armazenados no servidor
app.get("/session", (req, res) => {
    req.session.user =  {
        name: 'akdfmal',
        age: 430
    }
    res.send(req.session.user);
}
);
app.get("/ler", (req, res) => {
    var user = req.session.user
    res.json({user});
}
);
//importing Models
const Category = require("./categories/Category");
const Article = require("./articles/Article");
const User = require("./user/User");

//View Engine
app.set('view engine','ejs'); //requer uma pasta chamada views

// Static Archives
app.use(express.static('public')); // Ele requer uma pasta 'public' p guardar
// Rota principal (renderiza o index.ejs)
app.get("/", (req,res) =>{
    Article.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {model: Category}// Incluo o model de CATEGORIAS na pesquisa de categoria que devolve um array.
        ] 
    }).then(articles=>{
        Category.findAll().then(category=>{
            res.render('./../views/admin/articles/index', {article: articles,category: category});
        })
    }   ).catch((err)=>{
        console.log(err);
    }   )
})
// * Aq no res.render ele passa um json, que é o que vai ser renderizado no front-end

app.get("/:slug", (req,res) =>{ // busca o slug do artigo pelo slug nao pelo id
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
            }
            }).then(article=>{
                if (article != undefined){
                    res.render("article", {articles: article});    // Aqui eu passo a rota '', {Esse json é enviado ao front-end}}});
                }
                else{
                    res.redirect("/");
                }
        }).catch((err)=>{
            console.log(err);
        }   )
}   )

// importando meus dois conjuntos de rotas
app.use("/",categoriesController);
app.use("/",articleController);
app.use("/",usersController); 

// Database
connection
    .authenticate()
    .then(()=>{
        console.log('Comunicando com o banco de dados com sucesso !')
}).catch((err)=>{
    console.log("Erro encontrado: ", err);
})

app.listen(8080, ()=>{
    console.log("O servidor está rodando sem problemas.")
})