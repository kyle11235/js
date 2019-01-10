// modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// base url address - http://localhost:4000
app.listen(4000, function () {
    console.log('running at 4000...');
});

// api
app.get('/alipay/api/pay', function (req, res) {
    var user = req.query.user;
    var seller = req.query.seller;
    var money = req.query.money;

    // transfer money from user to seller
    var result = { message: money + " has been transfered from " + user + " to " + seller };
  
    // send response back to client - taotao's backend
    res.json(result);
});

