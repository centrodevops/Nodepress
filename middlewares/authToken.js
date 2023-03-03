const jwt = require('jsonwebtoken');
const jwtSecret = 'famdkfaç318nm7yhsaasdçl'


function authToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token != undefined) {       
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, jwtSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({error: 'Token inválido111'});
            } else {

                req.token = bearerToken;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });
    } else {
        res.status(401);
        res.json({error: 'Token inválido'});
    }
}


module.exports = authToken;