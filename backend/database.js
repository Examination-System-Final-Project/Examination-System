const mysql = require('mysql2')

exports.conn = mysql.createConnection({

    host: 'sql11.freemysqlhosting.net',
    user: 'sql11507096',
    password: '8hn9EVJzLJ',
    database: 'sql11507096',
    port: '3306'

})