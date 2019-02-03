/* 
# access COMMAND...
/usr/local/mysql/bin/mysql -uroot -p

# RESET password...
ALTER USER `root`@`localhost` IDENTIFIED BY 'new_password',
       `root`@`localhost` PASSWORD EXPIRE NEVER;

       ALTER USER `root`@`localhost` IDENTIFIED BY 'password' `root`@`localhost` PASSWORD EXPIRE NEVER;

       # Execute before running NODE
       ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOU_ROOT_PASSWORD';
    
       #Create a NEW USER before executing NODE
       CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
      
*/

let mysql = require('mysql'),
    config = require('./config'),
    util = require('util'),
    connection = mysql.createConnection(config);


connection.connect(err => {
    if (err) return console.error(`error: ${err.message}`);
    util.log('Connected to the MySQL Server.');
});

connection.end(err => {
    if (err) return console.error(`error. ${err.message}`);
    util.log('Close the database connection.')
});

connection.destroy();

//Create connection pools...
let pool = mysql.createPool({
    connectionLimit: 5,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

pool.getConnection((err, connection) => {
    // execute query...
});

pool.getConnection((err, connection) => {
    // Execute query...

    connection.release()
});

pool.end(err => {
    if (err) return console.error(err.message);
    // Close all connections...
})