const express = require('express');
const router = express.Router(); 
const User = require('./User.js'); 

router.get("/admin/users",(req,res)=>{
    res.send("Lista de Users")
    }
    );

router.get("/admin/users/create",(req,res)=>{
        res.render("admin/users/create.ejs");
    }
    );
router.post("/admin/users/create",(req,res)=>{
    const {name,email,password} = req.body;
    User.create({
        name: name,
        email: email,
        password: password
    }).then(user=>{
        res.redirect("/admin/users");
    }).catch(err=>{
        console.log(err);
    }
    )

}
);
module.exports = router;