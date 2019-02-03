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
const config = require('./config');

let mysql = require('mysql'),
    connection = mysql.createConnection(config);


// let pool = mysql.createPool({
//     connectionLimit: 5,
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.database
// });

// pool.getConnection((err, connection) => {
//     // execute query...

//     // connection.release();
//     // connection.destroy();
// });

// pool.end(err => {s
//     if (err) return console.error(err.message);
// })



connection.connect(err => {
    console.log(`Connected to the MySQL server.`);
    if (err) return console.error(`error: ${err.message}`);

    // let createTodos = `create table if not exists todos(
    //     id int primary key auto_increment, 
    //     title varchar(255)not null,
    //     completed tinyint(1) not null  default 0
    // )`;

    // let sql = `INSERT INTO todos(title, completed)
    //            VALUES('Learn how to insert a new row', true)`;

               // Inserting a row a return  the insert id
    let stmt = `INSERT INTO todos(title, completed)
                VALUES(?, ?)`;
                
    let todo = ['insert a new row with placeholders', false];

    // connection.query(createTodos, (err, result, fields) => {
    //     if (err) return console.error(err.message); 
    // });

    // connection.query(sql, (err, result, fields) => {
    //     if (err) return console.error(err.message); 
    // });

    connection.query(stmt, todo, (err, result, fields) => {
        if (err) return console.error(err.message); 

        console.log('Todo Id: ' + result.insertId);
    });

    // Get inserted id
   

    connection.end(err => {
        if (err) return console.error(`error: ${err.message}`);
        console.log(`Close the database connection.`);
    }); 
});


