const mysql = require('mysql2')

exports.conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Mody1010',
    database: 'examnation-system'
})