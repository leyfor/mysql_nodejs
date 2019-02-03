
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


    /* 
    Executing a simple query
    */


pool.getConnection((err, connection) => {
    if (err) return console.error(err.message);

    let sql = `SELECT * FROM todos`;

    connection.query(sql, (err, results, fields) => {
        if (err) return console.error(err.message);

        util.log(results);
    });
});


/* 
Passing data to the query
*/

pool.getConnection( (err, connection) => {
    if (err) return console.error(err.message);

    let sql = `SELECT * FROM todos WHERE completed=?`;

    connection.query(sql, [true], (err, results, fields) => {
        if (err) return console.error(err.message);

        util.log(results);
    });
});


/* 
Preventing SQL injection
*/

pool.getConnection((err, connection) => {
    if (err) return console.error(err.message);

    let id = process.argv[2] // pass argument to query
    let sql = `SELECT * FROM todos WHERE id= ${mysql.escape(id)}`;

    connection.query(sql, (err, results, fields) => {
        if (err) return console.error(err.message);
        util.log(results);
    });
});