
var translate = function (text, translateCallback){
	var tokenCallback = function(error, body){
		if (error) {
			
		}else{
			request.get(xxx, function (error, response, body) {
				if(!error){
					translateCallback(null, body);
				}else{
					translateCallback(error);
				}
			});
		}
	}
	// you need to provide callback
	getToken(successToken, tokenCallback);
}
var getToken = function (successToken, tokenCallback){
	request.get(xxx, function (error, response, body) {
		if(!error){
			tokenCallback(null, body);
		}else{
			tokenCallback(error);
		}
	});
}



var translateCallback = function(error, body){
	if (error) {
		
	}else{
		
	}
}
// you need to provide callback
this.translate('hello world', translateCallback);
