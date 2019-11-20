const fetch = require('node-fetch');

var getToken = async function (){
	console.log('getToken');

	// fetch returns promise
	let token = await fetch('https://github.com/kyle11235').catch((error) => { return error });

	// async return a promise
	return 'tokenxxx';
}

var translate = async function (text){
	console.log('translate');

	// no then, wait here
	let token = await getToken().catch((error) => { return error });
	console.log('token=' + token);

	let translatedText = await fetch('https://github.com/kyle11235').catch((error) => { return error });
	return 'translated hello world';
}

// await is only valid in async function
async function foo(){
	console.log('foo');

	let translatedText = await translate('hello world').catch((error) => { console.log(error);});
	
	// translatedText will be undefined if the promise is rejected
	if(translatedText){
		console.log('translatedText=' + translatedText);
	}
}

foo();

// npm install node-fetch
// node await.js
