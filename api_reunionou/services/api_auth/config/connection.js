const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'pwd',
    database: 'db'
});

connection.connect(function(err) {
    if(err){
        console.error('error connecting : '+ err.stack);
        return;
    }
});

module.exports = connection;