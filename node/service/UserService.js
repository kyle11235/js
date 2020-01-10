const Promise = require('bluebird');
const pool = require('./Pool');

exports.getList = function (teamID) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {     
            if (err){
                reject({status: 'failed', message: 'error, errno is ' + err.errno});
                return;
            }       
            let sql = 'select * from t_user where deleted = 0';
            if(teamID){
                sql = sql + ' and teamID = ' + teamID;
            }
            console.log('sql=' + sql);
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 'failed', message: 'error, errno is ' + error.errno});
                    return;
                }
                resolve({
                    status: 'success', 
                    data: results.map(e => {
                        delete e.password;
                        return e;
                    })
                });
            });
        });
    });
}

exports.create = function (user) {
    return new Promise(function (resolve, reject) {
        if (!user.name || user.name.trim() === '') {
            reject({status: 'failed', message: 'invalid name'});
            return;
        }
        if (!user.password || user.password.trim() === '') {
            reject({status: 'failed', message: 'invalid password'});
            return;
        }

        pool.getConnection(function (err, connection) {
            if (err){
                console.log(error);
                reject({status: 'failed', message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('insert into t_user set ? ', user, function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    if (error.errno === 1062) {
                        reject({status: 'failed', message: 'name exists'});
                        return;
                    }
                    reject({status: 'failed', message: 'error, errno is ' + error.errno});
                    return;
                }
                console.log(results.insertId);
                resolve({
                    status: 'success', 
                    data: results.insertId
                });
            });
        });
    });
}

exports.getByID = function (id) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 'failed', message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('select * from t_user where id = ?', [id], function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 'failed', message: 'error, errno is ' + error.errno});
                    return;
                }
                resolve({
                    status: 'success', 
                    data: results[0]
                });
            });
        });
    });
}

exports.getByName = function (name) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 'failed', message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('select * from t_user where name = ?', [name], function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 'failed', message: 'error, errno is ' + error.errno});
                    return;
                }
                resolve({
                    status: 'success', 
                    data: results[0]
                });
            });
        });
    });
}

exports.update = function (user) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 'failed', message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('update t_user set ? where id = ? ', [user, user.id], function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 'failed', message: 'error, errno is ' + error.errno});
                    return;
                }
                if (results.changedRows === 1) {
                    resolve({
                        status: 'success', 
                        data: results.changedRows
                    });
                    return;
                }
                resolve({status: 'failed', message: 'changedRows=0'});
            });
        });
    });
}

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err){
                reject({status: 'failed', message: 'error, errno is ' + err.errno});
                return;
            }     
            connection.query('update t_user set deleted = 1 where id = ? ', [id], function (error, results, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    reject({status: 'failed', message: 'error, errno is ' + error.errno});
                    return;
                }
                if (results.affectedRows === 1) {
                    resolve({
                        status: 'success', 
                        data: results.affectedRows
                    });
                    return;
                }
                resolve({status: 'failed', message: 'affectedRows=0'});
            });
        });
    });
}
