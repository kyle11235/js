# express

- install

        1.install express-generator -g
        2.express test

- basic route

        app.get('/', function (req, res) {
            res.send('Hello World!');
        });

        app.post('/', function (req, res) {
            res.send('Got a POST request');
        });

- res operation

        res.send(...)
        res.json(...)

- get url param

        var user_id = req.param('token');

- get route param

        app.get('/api/:version', function(req, res) {
            res.send(req.params.version);
        });

- post params

        npm install body-parser --save
        var bodyParser = require('body-parser');
        app.use(bodyParser.json()); // support json encoded bodies

        app.post('/api/users', function(req, res) {
            var user_id = req.body.id;
            var token = req.body.token;
            var geo = req.body.geo;

            res.send(user_id + ' ' + token + ' ' + geo);
        });

- express.Router (kind of express sub app)

        - birds.js
        var express = require('express');
        var router = express.Router();

        router.get('/about', function(req, res) {
            res.send('About birds');
        });

        module.exports = router;

        - main.js
        var birds = require('./birds');
        app.use('/birds', birds);

- sub app (kind of middleware)

        app.use('/birds', xxx);
        xxx can be another express app or router

- middleware

        actually above app.use(xxx) like app.use(bodyParser.json()) or app.use(some router or sub app) is middleware
        middleware is function intersects the request
        not only main app but sub app or router can use middleware

        var myLogger = function (req, res, next) {
            console.log('LOGGED');
            next();
        };

        app.use(myLogger);

        app.get('/', function (req, res) {
            res.send('Hello World!');
        });
