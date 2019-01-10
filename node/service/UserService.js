const Promise = require('bluebird');
const pool = require('./Pool');

exports.queryAll = function () {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {     
            if (err){
                reject({status: 1, message: 'error, errno is ' + err.errno});
                return;
            }       
            connection.query('select * from t_user', function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 1, message: 'error, errno is ' + error.errno});
                    return;
                }
                resolve(results.map(user => ({id: user.id, name: user.name})));
            });
        });
    });
}

exports.insert = function (user) {
    return new Promise(function (resolve, reject) {
        // TODO verify name
        if (!user.name || user.name.trim() === '') {
            reject({status: 1, message: 'invalid name'});
            return;
        }
        if (!user.password || user.password.trim() === '') {
            reject({status: 1, message: 'invalid password'});
            return;
        }

        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 1, message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('insert into t_user set ? ', user, function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    if (error.errno === 1062) {
                        reject({status: 1, message: 'name exists'});
                        return;
                    }
                    reject({status: 1, message: 'error, errno is ' + error.errno});
                    return;
                }
                console.log(results.insertId);
                resolve({status: 0, message: 'success'});
            });
        });
    });
}

exports.queryByName = function (name) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 1, message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('select * from t_user where name = ?', [name], function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 1, message: 'error, errno is ' + error.errno});
                    return;
                }
                resolve(results[0]);
            });
        });
    });
}

exports.update = function (user) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 1, message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('update t_user set ? where name = ? ', [user, user.name], function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 1, message: 'error, errno is ' + error.errno});
                    return;
                }
                if (results.changedRows === 1) {
                    resolve({status: 0, message: 'success'});
                    return;
                }
                resolve({status: 1, message: 'error'});
            });
        });
    });
}

exports.delete = function (name) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 1, message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('delete from t_user where name = ? ', [name], function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 1, message: 'error, errno is ' + error.errno});
                    return;
                }
                if (results.affectedRows === 1) {
                    resolve({status: 0, message: 'success'});
                    return;
                }
                resolve({status: 1, message: 'error'});
            });
        });
    });
}
