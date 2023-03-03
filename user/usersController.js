const express = require('express');
const router = express.Router(); 
const User = require('./User.js'); 

const adminAuth = require('./../middlewares/adminauth');
<<<<<<< HEAD
const authToken = require('./../middlewares/authToken');
const jwt = require('jsonwebtoken');



const jwtSecret = 'famdkfaç318nm7yhsaasdçl'

=======
>>>>>>> 2f6751af8238446528a9b5379a662360d8f01016

// ! Usando Hashs para criptografar a senha
const bcrypt = require('bcrypt');

<<<<<<< HEAD
router.get("/users/list",authToken, (req,res)=>{
    User.findAll().then(users=>{
        res.render('./../views/admin/users/', {users: users}); // Aqui eu passo a rota '', {Esse json é enviado ao front-end}
    })
    res.json({
            token: req.token,
            loggedUser: req.loggedUser
        }
    )

})
=======

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
>>>>>>> 2f6751af8238446528a9b5379a662360d8f01016
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
<<<<<<< HEAD
                    jwt.sign({id:user.id,email:user.email},jwtSecret,{expiresIn:'48h'},(err,token)=>{
                        if(err){
                            res.status(400).json({error: 'Falha interna'});
                        }else{
                            res.status(200);
                            res.redirect("/users/list");
                            console.log(token);
                        }
                    }
                    );
                }else{
                    res.status(400).json({error: 'Usuário ou senha inválidos'});
                    
=======
                    req.session.user = {
                        id:user.id,
                        email:user.email
                    };
                    res.redirect("/users/list");
                }else{
                    res.redirect("/users/login");
>>>>>>> 2f6751af8238446528a9b5379a662360d8f01016
                }
            }
            );
        }else{
            res.redirect("/users/login");
        }
    }
    );
});

<<<<<<< HEAD
router.post("/users/delete",(req,res)=>{
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/users/list");
            }
            );
        }else{
            res.redirect("/users/list");
        }
    }else{
        res.redirect("/users/list");
    }
}
);


=======
>>>>>>> 2f6751af8238446528a9b5379a662360d8f01016
// ? Logout de Usuário
router.get("/users/logout",(req,res)=>{
    res.redirect("/users/login");
});

module.exports = router;