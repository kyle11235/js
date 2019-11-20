const Promise = require('bluebird');
const request = require('request');

var getToken = function (){
	console.log('getToken');
	return new Promise(function (resolve, reject) {
		request.get('https://github.com/kyle11235', function (error, response, body) {
			if(!error){
				resolve('tokenxxx');
			}else{
				reject(error);
			}
		});
	});
}

var translate = function (text){
	console.log('translate');
	return new Promise(function (resolve, reject) {
		// your callbacks are .then .catch
		getToken().then(function(token){
			console.log('token=' + token);
			request.get('https://github.com/kyle11235', function (error, response, body) {
				if(!error){
					resolve('translated hello world');
				}else{
					reject(error);
				}
			});
		}).catch(function(error){
			reject(error);
		});
	});
}

// your callbacks are .then .catch
translate('hello world').then(function(translatedText){
	console.log('translatedText=' + translatedText);
}).catch(function(error){
    console.log(error);
});

// with Promise, the way you are thinking goes back to normal, just call the function you need, no need to handle callbacks
// best to return after resolve, or it continues to run any reject
// if miss all resolve/reject, resolve(undefined) to respond request

// npm install bluebird
// npm install request
// node after.js