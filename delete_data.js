
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

    let sql = `DELETE FROM todos WHERE id=?`;

    // Delete a row with id 1
    connection.query(sql, 1, (err, results, fields) => {
        if (err) return console.error(err.message);

        util.log(`Deleted Row(s): ${results.affectedRows}`);
    });
});