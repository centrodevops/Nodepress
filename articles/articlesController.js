const express = require('express');
const Category = require('../categories/Category.js');
const router = express.Router(); //instanciei um conjunto de rotas

const slugify = require('slugify');
const Article = require('../articles/Article.js');

router.get("/articles", (req,res) =>{
    Article.findAll({
        include: [{ model: Category }],

    }
    ).then(articles=>{
        res.render('./../views/index', {articles: articles}); // Aqui eu passo a rota '', {Esse json é enviado ao front-end}
    })
})
router.get("/articles/new",(req,res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new",{categories:categories});
    }) 
})

router.post("/articles/save", (req,res) =>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    var slug = slugify(title);
    if (title != undefined){
        Article.create({
            title: title,
            body: body,
            slug: slug,
            categoryId: category
        }).then(()=>{
            res.redirect("/articles");
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        res.redirect("/articles/new");
    }
})

router.post("/articles/delete" , (req,res)=>{
    var idForDelete = req.body.id;
    if(idForDelete != undefined){
        if (!isNaN(idForDelete)){
            Article.destroy({
                where: {
                    id:idForDelete
                }
            }).then(()=>{
                res.redirect("/articles")
            })
        }else{
            res.redirect("/articles");
        }
    }else{
        res.redirect("/articles");
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAGINAÇÃO //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/articles/page/:page", (req,res)=>{
    var page = req.params.page;
    Article.findAndCountAll({ // * findAndCountAll retorna um json com o total de registros e o array de registros
        include: [{ model: Category }],
        limit: 3, // limite de paginas
        offset: (page-1)*3, // retorna dados a partir de um valor
        order: [
            ['createdAt', 'ASC']
        ]
    }).then(articles=>{
        var total = Math.ceil(articles.count/3); // ceil arredonda para cima, LOGO, total de paginas
        var result = {
            article: articles.rows,
            total: total,
            page: page,
            prev: parseInt(page) -1,
            next: parseInt(page) +1,
        }
        res.render('./../views/pagination', {result:result});
    }).catch((err)=>{
        console.log(err);
    }   )   
}
)

module.exports = router;