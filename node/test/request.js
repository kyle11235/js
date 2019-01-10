const request = require('request');

const message = {
    name: "kyle.z.zhang1",
    password: "111"
};

const options = {
    url: 'http://localhost:3000/user/',
    json: true,
    body: message
};

request.put(options, function (error, response, body) {
    if(error){
        console.log(error);
    }
    console.log(JSON.stringify(body));
});

// curl -H "Content-type:application/json" -X POST http://localhost:3000 -d '{"name":"kyle", "age":"3"}'

