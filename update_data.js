
let mysql = require('mysql'),
config = require('./config'),
util = require('util'),
pool = mysql.createPool({
    connectionLimit: 5,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});


pool.getConnection((err, connection) => {
    if (err) return console.error(err.message);

    let sql = `UPDATE todos 
               SET completed = ? 
               WHERE id = ?`;

    let data = [false, 1];

    // execute the UPDATE statement
    connection.query(sql, data, (err, results, fields) => {
        if (err) return console.error(err.message);

        util.log(`Rows affected: ${results.affectedRows}`);
    });
});