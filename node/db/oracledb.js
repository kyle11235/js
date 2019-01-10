var Promise = require('bluebird');
var logger = require('../utils/Logger');


//To use oracle database module
//1 you develop on windows, you can install oracledb-pb
//2 when you deploy it to accs
// 2.1 you change code to use oracledb
// 2.2 make sure it's not included in node_modules
// 2.3 delete instantclient installed by oracledb-pb

var oracledb = require('oracledb-pb');
//var oracledb = require('oracledb');


var connAttrs = {
    "user": "system",
    "password": "xxx",
    "connectString": "140.86.15.59:1521/PDB1.gse00003465.oraclecloud.internal"
}

exports.getConnection = function(){
	return new Promise(function (resolve, reject) {
		oracledb.getConnection(connAttrs, function(err, connection){
			if (err) { 
				logger.error('oracledb', err.message, err); 
				reject(err); 
			}
			resolve(connection);
		});
	});
}

exports.closeConnection = function(connection){
	connection.close(function(err){
		if (err) { 
			logger.error('oracledb', err.message, err);
		}
		logger.info('oracledb', 'close connection');
	});
}

exports.query = function(buddy, skill){
	return new Promise(function (resolve, reject) {
		exports.getConnection().then(function(connection){
			
			var sql;
			var params = {};
			
			if (buddy && !skill) {
				sql = 'SELECT * FROM T_BUDDY_SKILL WHERE F_BUDDY = :buddy';
				params.buddy = buddy;
			}else if (!buddy && skill) {
				sql = 'SELECT * FROM T_BUDDY_SKILL WHERE F_SKILL = :skill';
				params.skill = skill;
			}else if (buddy && skill) {
				sql = 'SELECT * FROM T_BUDDY_SKILL WHERE F_BUDDY = :buddy AND F_SKILL = :skill';
				params.buddy = buddy;
				params.skill = skill;
			}else{
				sql = 'SELECT * FROM T_BUDDY_SKILL';
			}
			
			connection.execute(sql, params, {autoCommit: true}, function(err, result){

				if (err) { 
					logger.error('oracledb', err.message, err);
					reject(err); 
				}else{
					resolve(result.rows);
					logger.info('oracledb', 'result.rows' ,result.rows);
				}
				
				exports.closeConnection(connection);
			});
		}).catch(function(err){
			reject(err); 
		});
	});
};

exports.update = function(buddy, skill, rating){
	return new Promise(function (resolve, reject) {
		exports.query(buddy, skill).then(function(rows){
			exports.getConnection().then(function(connection){

				var sql;
				var params = {};
				params.buddy = buddy;
				params.skill = skill;
				params.rating = rating;
				
				if (rows && rows.length > 0) {
					sql = 'UPDATE T_BUDDY_SKILL SET F_RATING = :rating WHERE F_BUDDY = :buddy AND F_SKILL = :skill';
				}else{
					sql = 'INSERT INTO T_BUDDY_SKILL (F_BUDDY, F_SKILL, F_RATING) VALUES (:buddy, :skill, :rating)';
				}
				
				connection.execute(sql, params, {autoCommit: true}, function(err, result){
				
					if (err) { 
						logger.error('oracledb', err.message, err);
						reject(err); 
					}else{
						resolve();
						logger.info('oracledb', 'success', sql);
					}
					
					exports.closeConnection(connection);
				});
			}).catch(function(err){
				reject(err); 
			});
		});
	});
};


//this.query('kyle', null);
//this.query(null, 'jcs');
//this.update('kyle', 'devcs', '2');




