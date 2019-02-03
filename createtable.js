
let mysql = require('mysql'),
    util = require('util'),
    config = require('./config'),
    connection = mysql.createConnection(config);


// Connect to the MySQL Server
connection.connect( err => {
    if (err) return console.error(`error: ${err.message}`);

    let createTodos = `CREATE TABLE if not exists todos(
        id int primary key auto_increment,
        title varchar(255) not null,
        completed tinyint(1) not null default 0
    )`;

    connection.query(createTodos, (err, results, fields)  => {
        if (err) return console.error(err.message);
    });

    connection.end( err => {
        if (err) return console.error(err.message);
    });
});