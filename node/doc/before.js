const request = require('request');

var translate = function (text, translateCallback){
	// get token
	request.get('https://github.com/kyle11235', function (error, response, body) {
		if(!error){
			console.log('token=tokenxxx');
			// get translated text
			request.get('https://github.com/kyle11235', function (error, response, body) {
				if(!error){
					// callback
					translateCallback(null, 'translated hello world');
				}else{
					translateCallback(error);
				}
			});
		}else{
			translateCallback(error);
		}
	});	
}

translate('hello world', function(error, translatedText){
	if (error) {
		console.log(error);
	}else{
		console.log('translatedText=' + translatedText);
	}
});

// nested callback
// npm install request
// node before.js