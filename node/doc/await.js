const fetch = require('node-fetch');

// or
// npm install request
// npm install request-promise-native
// const request = require('request-promise-native');
// let res = await request({ uri:  "https://github.com/kyle11235", json: true });

// await in async, async return a promise
var getToken = async function (){
	console.log('getToken');

	// 1. short version
	// let res = await promisedFunction().catch((err) => { console.error(err); });
	// if the promise is rejected, you can check res is undefined/valid or not, func in catch does not help

	// 2. long version
	// fetch/request does not reject, if error -> res is error
	try {
		// let res = await fetch('https://github.com/kyle11235');
		let res = await fetch('xxx');
		console.log('getToken ok');
		return {
			error: null,
			token: 'tokenxxx'
		};  
	} catch(error) {
		console.log('get token error=' + error);
		return {
			error: error,
			token: null
		};  
	}
}

var translate = async function (text){
	console.log('translate');

	let res = await getToken();
	if(res.error){
		return {
			error: res.error,
			text: null
		};  
	}

	try {
		let res = await fetch('https://github.com/kyle11235');
		console.log('translate ok');
		return {
			error: null,
			text: 'hello'
		};  
	} catch(error) {
		console.log('translate error=' + error);
		return {
			error: error,
			text: null
		};  
	}
}

// await is only valid in async function
async function foo(){
	console.log('foo' );

	let res = await translate('ni hao');
	if(res.error){
		console.log('foo error=' + res.error);
		return;
	}
	console.log('foo ok, res=' + res.text);
}

foo();


// npm install node-fetch
// node await.js
