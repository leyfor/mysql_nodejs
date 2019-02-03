/* 
# COMMAND to show rows in the database
 
select * from todos;
*/

let mysql = require('mysql'),
    util = require('util'),
    config = require('./config'),
    //Create connection pools...
    pool = mysql.createPool({
        connectionLimit: 5,
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });;


pool.getConnection((err, connection) => {

    if (err) return console.error(err.message);
    // Insert statement
let sql = `INSERT INTO todos(title, completed)
           VALUES('Learn how to insert a new row, true')`;

// Execute the insert statement
  connection.query(sql, (err, results, fields) => {
        if (err) return console.error(err.message);

        // get inserted fields
    util.log(`Todo Id: ${fields}`);

  connection.end();
});
})


/*  
Insert a row and return the inserted id 
*/

pool.getConnection((err, connection) => {

  let stml = `INSERT INTO todos(title, completed)
            VALUES(?, ?)`;
let todo = ['Insert a new row with placeholders', false];

connection.query(stml, todo, (err, results, fields) => {
    if (err) return console.error(err.message) 
    // get inserted id
    util.log(`Todo Id: ${results.insertId}`);
});

});


/* 
insert multiple rows at a time
*/

pool.getConnection((err, connection) => {
  if (err) return console.error(err.message);

  let stmt = `INSERT INTO todos(title, completed) VALUES ? `;
  let todos = [
    ['Insert multiple rows at a time', false],
    ['It should work perfectly', true]
  ];

  // execute the insert statement
  connection.query(stmt, [todos], (err, results, fields) => {
    if (err) return console.error(err.message);

    // get the inserted rows
    util.log(`Row inseted: ${results.affectedRows}`);
  });

  //connection.end();
})