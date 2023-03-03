const express = require('express');
const router = express.Router(); //instanciei um conjunto de rotas
const Category = require('./Category.js'); // carregando o Model de categorias
const Article = require('../articles/Article.js'); // carregando o Model de artigos
const slugify = require('slugify');

router.get("/admin/categories/new", (req,res) =>{
    res.render('./../views/admin/categories/new');
})
// Rota que salva uma categoria
// usa método POST, envia dados pro servidor e 
router.post("/categories/save", (req,res) =>{ // ! Sempre usar POST para formulários pq ele nao envia dados em URLS
    var title = req.body.title; // armazena o que foi enviado no form da NEW na variavel Title
    console.log(title);
    if (title != undefined){

        // empurra pro banco
        Category.create({
            title: title,
            slug: slugify(title),
        }).then(()=>{
            res.redirect("/admin/categories");
        }).catch((err)=>{
            console.log(err);
        })

    }else{
        res.redirect("/admin/categories/new");
    }
})

router.post("/categories/delete/" , (req,res)=>{
    var idForDelete = req.body.id;
    if(idForDelete != undefined){
        if (!isNaN(idForDelete)){
            Category.destroy({
                where: {
                    id:idForDelete
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
})

// Rota que renderiza as categorias
router.get("/categories/list", (req,res)=>{
    Category.findAll().then(categories=>{
        res.render('./../views/admin/categories/', {categories: categories}); // Aqui eu passo a rota '', {Esse json é enviado ao front-end}
    })
    
})
// Rota que renderiza pagiand de edição
router.get("/categories/edit/:id",(req,res)=>{
    var id = req.params.id;
    Category.findByPk(id).then(category =>{
        if (category != undefined){
            res.render("./../views/admin/categories/edit", {category: category}); // ! Json com os arquivos que vc quer mandar pro front-end sempre no render.
        }else{
            res.redirect("/categories");
        }
    }).catch(err =>{
        console.log(err);
        res.redirect("/admin/categories");
    })
})
// Rota POST de salvamento.
router.post("/categories/update" , (req,res)=>{
    var idForEdit = req.body.id;
    var title = req.body.title;
    var slug = slugify(title);
    if(idForEdit != undefined){
        if (!isNaN(idForEdit)){
            Category.update({title:title, slug: slugify(title)},{
                where: {
                    id:idForEdit
                }
                
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
})

router.get("/categories/:slug", (req,res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [
            {model: Article}// Incluo o model de artigos na pesquisa de categoria que devolve um array.
        ] 
    }).then(category =>{
        if (category != undefined){

            res.render("./../views/admin/categories/categoryPage", {category: category, article: category.articles});

        }else{
            res.redirect("/admin/categories");
        }
    }).catch(err =>{
        console.log(err);
        res.redirect("/admin/categories");
    }
    )
}   )
module.exports = router;