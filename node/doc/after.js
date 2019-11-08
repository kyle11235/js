var Promise = require('bluebird');
var request = require('request');

var translate = function (text){
	return new Promise(function (resolve, reject) {
		// your callbacks are .then .catch
		getToken().then(function(token){
			request.get('https://github.com/kyle11235', function (error, response, body) {
				if(!error){
					resolve(body);
				}else{
					reject(error);
				}
			});
		}).catch(function(error){
			reject(error);
		});
	});
}
var getToken = function (){
	return new Promise(function (resolve, reject) {
		request.get('https://github.com/kyle11235', function (error, response, body) {
			if(!error){
				resolve(body);
			}
			reject(error);
		});
	});
}

// your callbacks are .then .catch
translate('hello world').then(function(translatedText){
	console.log('ok');
}).catch(function(error){
    console.log(error);
});

// with Promise, the way you are thinking goes back to normal, just call the function you need, no need to handle callbacks

// npm install bluebird
// npm install request
// node after.js