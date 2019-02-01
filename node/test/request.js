const request = require('request');

const headers = {};
headers['Content-Type'] = 'application/json; charset=utf-8';

const body = {
    name: "kyle.z.zhang1",
    password: "111"
};


/*
json: true does these:
1. content-type: application/json, JSON.stringify(body)
2. accept: application/json, JSON.parse(resBody)
*/
const options = {
    url: 'http://localhost:3000/user/',
    json: true,
    headers: headers,
    body: body
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

// curl -H "Content-type:application/json" -X POST http://localhost:3000 -d '{"name":"kyle", "age":"3"}'

