const Sequelize = require('sequelize');
// Indica onde estamos nos conectando
<<<<<<< HEAD
const connection = new Sequelize('wordpress_clone','MY-USER','MY-PASS',{
=======
const connection = new Sequelize('wordpress_clone','root','****MY-PASSWORD***',{
>>>>>>> 2f6751af8238446528a9b5379a662360d8f01016
    //parametros
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
});

module.exports = connection;