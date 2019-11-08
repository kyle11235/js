var request = require('request');

var translate = function (text, translateCallback){
	var tokenCallback = function(error, body){
		if (error) {
			translateCallback(error);
		}else{
			request.get('https://github.com/kyle11235', function (error, response, body) {
				if(!error){
					translateCallback(null, body);
				}else{
					translateCallback(error);
				}
			});
		}
	}
	// you need to provide callback
	getToken(tokenCallback);
}
var getToken = function (tokenCallback){
	request.get('https://github.com/kyle11235', function (error, response, body) {
		if(!error){
			tokenCallback(null, body);
		}else{
			tokenCallback(error);
		}
	});
}

var translateCallback = function(error, body){
	if (error) {
		console.log(error);
	}else{
		console.log('ok');
	}
}
// you need to provide callback
translate('hello world', translateCallback);
