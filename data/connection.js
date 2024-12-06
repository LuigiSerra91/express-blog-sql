const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connect to MySQL');
    
});

module.exports = connection