const express = require('express');
const router = express.Router(); 
const User = require('./User.js'); 

// ! Usando Hashs para criptografar a senha
const bcrypt = require('bcrypt');


router.get("/admin/users",(req,res)=>{ // Rota para listar todos os usuarios
    User.findAll().then(users=>{
        res.render("admin/users/index",{users: users}); // Renderiza o index.ejs e passa um json de usuarios
    }
    ).catch(err=>{
        console.log(err);
    }
    )
}
)
router.get("/admin/users/create",(req,res)=>{
        res.render("admin/users/create.ejs");
    }
    );
router.post("/admin/users/create",(req,res)=>{
    const {email,password} = req.body;

    // ! Antes de gerar o hash, verificar se ESSE EMAIL já foi cadastrado no banco de dados.
    User.findOne({where:{email:email}}).then(user=>{
        if(user){
            res.redirect("/admin/users/create");
            console.log('Email já cadastrado');
        }else{
            // ! Gerar o hash da senha
            bcrypt.hash(password,9).then(hash=>{
                // ! Criar o usuário
                User.create({
                    email:email,
                    password:hash
                }).then(user=>{
                    console.log(user);
                    res.redirect("/admin/users");
                }).catch(err=>{
                    res.redirect("/admin/users/create");
                    console.log(err);
                }
                );
            }
            );
        }
    }
    );
}
);

router.post("/admin/users/delete" , (req,res)=>{
    var idForDelete = req.body.id;
    if(idForDelete != undefined){
        if (!isNaN(idForDelete)){
            User.destroy({
                where: {
                    id:idForDelete
                }
                    
            }).then(()=>{
                console.log("Deletado com sucesso");
                res.redirect("/admin/categories")
            })
        }else{
            console.log("Não é um número");
            res.redirect("/admin/categories");
        }
    }else{
        console.log("Não existe");
        res.redirect("/admin/categories");
    }
})

module.exports = router;