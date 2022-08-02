const express = require('express');
const router = express.Router(); 
const User = require('./User.js'); 

const adminAuth = require('./../middlewares/adminauth');

// ! Usando Hashs para criptografar a senha
const bcrypt = require('bcrypt');


router.get("/users/list", adminAuth ,(req,res)=>{ // Rota para listar todos os usuarios
    User.findAll().then(users=>{
        res.render("admin/users/index",{users: users}); // Renderiza o index.ejs e passa um json de usuarios
    }
    ).catch(err=>{
        console.log(err);
    }
    )
}
)
router.get("/users/create",(req,res)=>{
        res.render("admin/users/create.ejs");
    }
    );
router.post("/users/create",(req,res)=>{
    const {email,password} = req.body;

    // ! Antes de gerar o hash, verificar se ESSE EMAIL já foi cadastrado no banco de dados.
    User.findOne({where:{email:email}}).then(user=>{
        if(user){
            res.redirect("/users/create");
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
                    res.redirect("/users/list");
                }).catch(err=>{
                    res.redirect("/users/create");
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

router.get("/users/sair" , (req,res)=>{
    try{
        req.session.user = undefined;
        res.redirect("/categories/list");
    }   catch(err){
        console.log(err);
    }

})

router.get("/users/login",(req,res)=>{
    res.render("admin/users/loginpage.ejs");
});

// ? Login de Usuário

router.post("/users/auth",(req,res)=>{
    const {email,password} = req.body;
    User.findOne({where:{email:email}}).then(user=>{
        if(user != undefined){
            bcrypt.compare(password,user.password).then(result=>{
                if(result){
                    req.session.user = {
                        id:user.id,
                        email:user.email
                    };
                    res.redirect("/users/list");
                }else{
                    res.redirect("/users/login");
                }
            }
            );
        }else{
            res.redirect("/users/login");
        }
    }
    );
});

// ? Logout de Usuário
router.get("/users/logout",(req,res)=>{
    res.redirect("/users/login");
});

module.exports = router;