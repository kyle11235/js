var Promise = require('bluebird');

var translate = function (text){
	return new Promise(function (resolve, reject) {
		// your callbacks are .then .catch
		getToken().then(function(token){
			request.get(xxx, function (error, response, body) {
				if(!error){
					resolve(body);
				}else{
					reject(error);
				}
			});
		}).catch(function(){
			
		});
	});
}
var getToken = function (){
	return new Promise(function (resolve, reject) {
		request.get(xxx, function (error, response, body) {
			if(!error){
				resolve(body);
			}
			reject(error);
		});
	});
}

// your callbacks are .then .catch
this.translate('hello world').then(function(translatedText){
	
}).catch(function(error){
	
});

// with Promise, the way you are thinking goes back to normal, just call the function you need, no need to handle callbacks