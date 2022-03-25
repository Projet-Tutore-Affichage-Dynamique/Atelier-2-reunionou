const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'db_reunionou',
    user: 'user',
    password: 'pwd',
    database: 'db',
    multipleStatements: true
});

connection.connect(function(err) {
    if(err){
        console.error('error connecting : '+ err.stack);
        return;
    }
});

module.exports = connection;