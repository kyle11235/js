const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pipelineHub',
    database: 'pipelineHub'
});

exports.getConnection = function (callback) {
    pool.getConnection(callback);
}

