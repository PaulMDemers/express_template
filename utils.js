const mysql = require('mysql2');

var pool = mysql.createPool({
    host: process.env.MySQLHost,
    user: process.env.MySQLUser,
    password: process.env.MySQLPasswd,
    database: process.env.MySQLDB
});

var promisePool = pool.promise();

module.exports.ServerVersion = process.env.ServerVersion;

module.exports.Pool = promisePool;