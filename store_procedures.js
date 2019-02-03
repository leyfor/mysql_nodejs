
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


