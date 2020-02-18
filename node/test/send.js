const request = require('request');

const headers = {};
headers['Content-Type'] = 'application/json; charset=utf-8';


json = {
    "name": "kyle"
}

/*
json: true does these:
1. content-type: application/json, JSON.stringify(body)
2. accept: application/json, JSON.parse(resBody)
*/
const options = {
    url: 'http://localhost:3000/api/post',
    json: true,
    headers: headers,
    body: json
};

request.post(options, function (error, response, body) {
    if(error){
        console.log(error);
    }
    console.log('response--------');
    console.log(JSON.stringify(response));
    console.log('body--------');
    console.log(JSON.stringify(body));
    console.log('error--------');
    console.log(JSON.stringify(error));
});

// npm install request

// json
// node send.js

// form data
// curl -X POST http://localhost:3000/key -d 'code=3'

// json
// curl http://localhost:3000/api/get
// curl -H "Content-type:application/json" -X POST http://localhost:3000/api/post -d "{\"name\":\"kyle\"}"

// file
// curl -H "Content-Type:application/json" -X POST http://localhost:3000/api/post -d @test.json
