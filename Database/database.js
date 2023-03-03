const Sequelize = require('sequelize');
// Indica onde estamos nos conectando
const connection = new Sequelize('wordpress_clone','MY-USER','MY-PASS',{
    //parametros
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
});

module.exports = connection;